import { getCookies, isCookieExist } from './cookies';

export const getCookiesAuth = (headers: URLSearchParams | Headers) => {
  const jwtTokenType = getCookies('jwtTokenType');
  const jwtToken = getCookies('jwtToken');

  console.log(jwtTokenType, jwtToken);

  headers.append('Authorization', `${jwtTokenType} ${jwtToken}`);
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
