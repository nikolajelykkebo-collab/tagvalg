import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const auth = req.headers.get('authorization');
  const validUser = process.env.SITE_USERNAME;
  const validPass = process.env.SITE_PASSWORD;

  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(':');
      if (user === validUser && pass === validPass) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse('Adgang kræver login', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Tagvalg"',
    },
  });
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
