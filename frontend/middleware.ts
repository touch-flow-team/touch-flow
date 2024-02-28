import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import client from './libs/pocketbase';
import { getNextjsCookie } from '@/libs/server-cookie';
import { SIGNIN_URL } from './constants/constants';

function clearAuthStoreAndSetCookie(response: NextResponse) {
  client.authStore.clear();
  response.headers.set('set-cookie', client.authStore.exportToCookie({ httpOnly: false }));
}

function redirectTo(url: URL) {
  return NextResponse.redirect(url);
}

function isCurrentUrl(url: string, request: NextRequest) {
  return request.nextUrl.pathname.startsWith(url);
}

async function authenticateUser(request: NextRequest, response: NextResponse) {
  const request_cookie = request.cookies.get('pb_auth');
  const cookie = await getNextjsCookie(request_cookie);
  if (cookie) {
    try {
      client.authStore.loadFromCookie(cookie);
    } catch (error) {
      clearAuthStoreAndSetCookie(response);
    }
  }
  try {
    if (client.authStore.isValid) {
      await client.collection('users').authRefresh();
    }
  } catch (err) {
    clearAuthStoreAndSetCookie(response);
  }
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  await authenticateUser(request, response);

  if (isCurrentUrl(`/auth/`, request)) {
    if (client.authStore.model) {
      const redirectUrl = new URL(`/`, request.url);
      const response = NextResponse.redirect(redirectUrl);
      response.cookies.set('message', `로그아웃 후 접속해주시길 바랍니다. 🙏`);
      return response;
    }
  }

  const pathSegments = request.nextUrl.pathname.split('/');
  const companyId = pathSegments[2];
  if (isCurrentUrl(`/companies/${companyId}/`, request)) {
    if (client.authStore.model) {
      const userCompanies = client.authStore.model['companies'];
      if (!userCompanies.includes(companyId)) {
        const redirectUrl = new URL(`/companies/${companyId}/`, request.url);
        const response = NextResponse.redirect(redirectUrl);
        response.cookies.set('message', `해당 회사의 관리자만 접근 할 수 있습니다. 😔`);
        return response;
      }
    } else {
      return redirectTo(new URL(SIGNIN_URL, request.url));
    }
  }
  return response;
}

export const config = {
  matcher: ['/companies/:path*', '/auth/:path*'],
};
