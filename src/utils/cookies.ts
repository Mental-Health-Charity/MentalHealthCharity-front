'use server';

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export const createCookies = async (
  key: string,
  value: string,
  options: Partial<ResponseCookie>,
) => {
  cookies().set(key, value, options);
};

export const getCookies = (key: string) => {
  return cookies().get(key)?.value;
};

export const isCookieExist = (key: string) => {
  return cookies().get(key)?.value !== undefined;
};

export const expireCookie = (key: string) => {
  return cookies().set(key, '', { maxAge: 0 });
};

export const getCookiesAuth = async () => {
  const headers = new Headers();

  const jwtTokenType = cookies().get('jwtTokenType')?.value;
  const jwtToken = cookies().get('jwtToken')?.value;

  console.error(jwtTokenType);

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `${jwtTokenType} ${jwtToken}`);

  // console.warn('headers ', headers);

  return headers;
};




export const restoreUserSession = async () => {
  const jwtToken = getCookies('jwtToken');
  const jwtTokenType = getCookies('jwtTokenType');
  const isTokenExist = isCookieExist('jwtToken');

  if (isTokenExist && jwtTokenType && jwtToken) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_ME_URL}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${jwtTokenType} ${jwtToken}`,
      },
    });
    return res.json();
  }
};
