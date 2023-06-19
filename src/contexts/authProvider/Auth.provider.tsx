'use client';

import {
  createCookies,
  expireCookie,
  getCookies,
  isCookieExist,
} from '@/utils/cookies';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';
import { useRouter } from 'next/navigation';
import { createContext, useState, useEffect, useContext, use } from 'react';
import { CookiesProvider } from 'react-cookie';

export interface User {
  full_name: string;
  password: string;
  email: string;
  user_role?: string;
  id?: number;
  is_active?: boolean;
}

interface LoginUserData {
  username: string;
  password: string;
}

interface AccessToken {
  access_token: string;
  token_type: string;
  detail?: string;
}

interface AuthContextType {
  user: User | null;
  login: (loginData: LoginUserData) => Promise<void>;
  logout: () => void;
  signIn: (userData: User) => Promise<void>;
  error: AccessToken | undefined;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const useProvideAuth = (userData: User | null) => {
  const [user, setUser] = useState<User | null>(userData);
  const [error, setError] = useState<AccessToken>();
  const { push } = useRouter();

  const signIn = async (newUserParams: User) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/open`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserParams),
      },
    );
    const data: AccessToken = await res.json();
    if (res.ok) {
      setError(undefined);
      successPopUp('Pomyślnie utworzono nowe konto.');
      push('login');
    } else {
      setError(data);
      failurePopUp(
        'Wystąpił błąd podczas rejestracji. Wprowadź poprawne dane.',
      );
      console.log('FAILURE: response:', res.ok);
      console.log('error: ', data);
    }
  };

  const login = async (loginDataParams: LoginUserData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ACCESS_TOKEN_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(loginDataParams as any),
    });

    const data: AccessToken = await res.json();
    const error = res.ok;
    console.log(error, res.statusText);

    if (res.ok) {
      createCookies('jwtToken', data.access_token, { secure: true });
      createCookies('jwtTokenType', data.token_type, { secure: true });

      const authorization = `${data.token_type} ${data.access_token}`;

      const getUserData = await fetch(
        `${process.env.NEXT_PUBLIC_LOGIN_ME_URL}`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authorization,
          },
        },
      );

      const userDataValue: User = await getUserData.json();
      setUser(userDataValue);
      console.log('USERDATA: ', user);
      setError(undefined);
      successPopUp('Pomyślnie zalogowano!');
    } else {
      setError(data);
      console.log('error: ', data);
      failurePopUp('Wystąpił błąd, niepoprawne dane.');
    }
  };

  const logout = () => {
    setUser(null);
    expireCookie('jwtToken');
    expireCookie('jwtTokenType');
  };

  return {
    user,
    login,
    logout,
    signIn,
    error,
  };
};

export const AuthProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) => {
  const auth = useProvideAuth(user);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
