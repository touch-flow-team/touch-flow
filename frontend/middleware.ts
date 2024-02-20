import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import client from './lib/pockebase';
import { getNextjsCookie } from '@/lib/server-cookie';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const request_cookie = request.cookies.get('pb_auth');

  const cookie = await getNextjsCookie(request_cookie);
  if (cookie) {
    try {
      client.authStore.loadFromCookie(cookie);
    } catch (error) {
      client.authStore.clear();
      response.headers.set('set-cookie', client.authStore.exportToCookie({ httpOnly: false }));
    }
  }

  try {
    client.authStore.isValid && (await client.collection('users').authRefresh());
  } catch (err) {
    client.authStore.clear();
    response.headers.set('set-cookie', client.authStore.exportToCookie({ httpOnly: false }));
  }

  if (!client.authStore.model && !request.nextUrl.pathname.startsWith('/auth/signin')) {
    const redirect_to = new URL('/auth/signin', request.url);
    if (request.nextUrl.pathname) {
      redirect_to.search = new URLSearchParams({
        next: request.nextUrl.pathname,
      }).toString();
    } else {
      redirect_to.search = new URLSearchParams({
        next: '/',
      }).toString();
    }
    return NextResponse.redirect(redirect_to);
  }
  return response;
}

export const config = {
  matcher: [
    '/companies/:companiesId/dashboard',
    '/companies/:companiesId/calendar',
    '/companies/:companiesId/waitings',
  ],
};
