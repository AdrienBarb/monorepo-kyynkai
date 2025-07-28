import { strictlyAuth } from '@/hoc/strictlyAuth';
import { NextResponse, NextRequest } from 'next/server';
import { getCurrentUser } from '@/services/users/getCurrentUser';
import { updateUser } from '@/services/users/updateUser';
import { creditPackages } from '@/constants/creditPackages';
import { errorHandler } from '@/utils/errors/errorHandler';
import { errorMessages } from '@/lib/constants/errorMessage';
import { prisma } from '@/lib/db/client';
import axios from 'axios';

export const POST = strictlyAuth(async (req: NextRequest) => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;

    const body = await req.json();
    const { packageId, currentUrl } = body;

    const user = await getCurrentUser({ userId: userId! });

    if (!user) {
      return NextResponse.json(
        { error: errorMessages.USER_NOT_FOUND },
        { status: 404 },
      );
    }

    if (!currentUrl || !packageId) {
      return NextResponse.json(
        { error: errorMessages.MISSING_FIELDS },
        { status: 400 },
      );
    }

    const selectedPackage = creditPackages.find((pkg) => pkg.id === packageId);
    if (!selectedPackage) {
      return NextResponse.json(
        { error: errorMessages.INVALID_PACKAGE },
        { status: 400 },
      );
    }

    const transaction = await prisma.transaction.create({
      data: {
        userId: userId!,
        creditAmount: selectedPackage.coinsAmount,
        fiatAmount: selectedPackage.price,
        currency: 'EUR',
      },
    });

    const ccAuthTokenRequest = await axios.post(
      process.env.CC_BASE_URL + '/v1/token',
      {
        login: process.env.CC_LOGIN,
        password: process.env.CC_PASSWORD,
      },
    );

    const ccAuthToken = ccAuthTokenRequest.data.token;

    const ccPaymentFormRequest = await axios.post(
      process.env.CC_BASE_URL + '/v1/api/payment_form/configure',
      {
        MerchantInfo: {
          merchantId: process.env.CC_MERCHANT_ID,
          merchantWebsiteId: process.env.CC_MERCHANT_WEBSITE_ID,
          userName: 'ab@kyynk.com',
          externalId: transaction.id,
        },
        TransactionInfo: {
          description: selectedPackage.name,
          amount: selectedPackage.price,
          currency: 'EUR',
        },
        ThreeDInfo: {
          redirectUrl: `${currentUrl}?shouldRefetch=true`,
        },
        CustomerInfo: {
          email: user.email,
        },
        ConfigurationOptions: {
          paymentMethod: 'credit-card',
        },
        Callbacks: {
          onSuccessUrl: process.env.CLIENT_URL + '/api/payment/success',
          onFailUrl: process.env.CLIENT_URL + '/api/payment/fail',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${ccAuthToken}`,
        },
      },
    );

    return NextResponse.json(
      { forwardUrl: ccPaymentFormRequest.data.forwardUrl },
      { status: 200 },
    );
  } catch (error) {
    return errorHandler(error);
  }
});
