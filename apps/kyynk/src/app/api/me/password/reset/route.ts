import { errorMessages } from '@/lib/constants/errorMessage';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

export const POST = async (req: NextRequest) => {
  try {
    const { password, userId, token } = await req.json();

    if (!password || !userId || !token) {
      return NextResponse.json(
        { message: errorMessages.MISSING_FIELDS },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: errorMessages.USER_NOT_FOUND },
        { status: 400 },
      );
    }

    let userToken = await prisma.userToken.findUnique({
      where: { userId: user.id, token: token },
    });

    if (!userToken) {
      return NextResponse.json(
        { message: errorMessages.INVALID_LINK },
        { status: 400 },
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          password: hashedPassword,
        },
      }),
      prisma.userToken.delete({
        where: {
          id: userToken.id,
        },
      }),
    ]);

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
