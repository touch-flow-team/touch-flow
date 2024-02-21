import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import client from './lib/pockebase';
import { getNextjsCookie } from '@/lib/server-cookie';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const request_cookie = request.cookies.get('pb_auth');
  const cookie = await getNextjsCookie(request_cookie);
  const pathSegments = request.nextUrl.pathname.split('/');
  const id = pathSegments[2];
  const from = pathSegments[3];
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

  // 로그인 ✅ - 본인 companies로 접근 여부 체크 로직
  if (request.nextUrl.pathname.startsWith(`/companies/${id}/`) && client.authStore.model) {
    const userCompanies = client.authStore.model['companies'];
    if (userCompanies.includes(id)) {
      console.log('자네는 합격✅');
    } else {
      console.log('자네는 불합격❌');
      const redirect_to = new URL(request.nextUrl.pathname.replace(`/${from}`, ''), request.url);
      return NextResponse.redirect(redirect_to);
    }
  }
  // 로그인 ❌ - companies로 접근 막는 로직
  if (request.nextUrl.pathname.startsWith(`/companies/${id}/`) && !client.authStore.model) {
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
  matcher: ['/companies/:path*'],
};
