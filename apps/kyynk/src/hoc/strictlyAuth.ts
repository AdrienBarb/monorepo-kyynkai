import { auth } from '@/lib/better-auth/auth';
import { errorMessages } from '@/lib/constants/errorMessage';
import { NextResponse, NextRequest } from 'next/server';

type Handler = (request: NextRequest, session: any) => Promise<NextResponse>;

export function strictlyAuth(handler: Handler) {
  return async (request: NextRequest) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json(
        { message: errorMessages.NOT_AUTHENTICATE },
        { status: 401 },
      );
    }

    return handler(request, session);
  };
}
