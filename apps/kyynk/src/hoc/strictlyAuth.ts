import { auth } from '@/auth';
import { errorMessages } from '@/lib/constants/errorMessage';
import { NextResponse } from 'next/server';

type Handler = (...args: any[]) => Promise<NextResponse> | NextResponse;

export function strictlyAuth(handler: Handler) {
  return auth(async (...args) => {
    const [req] = args;

    if (!req.auth) {
      return NextResponse.json(
        { message: errorMessages.NOT_AUTHENTICATE },
        { status: 401 },
      );
    }

    return handler(...args);
  }) as Handler;
}
