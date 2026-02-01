import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  // Rotas protegidas (exceto /ats que é público)
  if (
    request.nextUrl.pathname.startsWith('/app') &&
    !request.nextUrl.pathname.startsWith('/ats')
  ) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirecionar usuários autenticados de login/signup para o app
  if (
    (request.nextUrl.pathname === '/login' ||
      request.nextUrl.pathname === '/signup') &&
    token
  ) {
    const payload = await verifyToken(token);
    if (payload) {
      return NextResponse.redirect(new URL('/app', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*', '/ats/:path*', '/login', '/signup'],
};
