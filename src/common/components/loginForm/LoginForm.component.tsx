'use client';
import Link from 'next/link';
import styles from './LoginForm.module.scss';
import { FormEvent, useState } from 'react';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import { MouseEvent } from 'react';
import clsx from 'clsx';
import UserInfo from './UserInfo/UserInfo.component';

const LoginForm = () => {
  const { login, user, logout, error } = useAuth();

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(loginData);
    console.log(loginData);
  };

  if (!user) {
    return (
      <section className={styles.login}>
        <h1 className={styles.login__desc}>Zaloguj</h1>
        <form onSubmit={(e) => handleLogin(e)} className={styles.login__form}>
          <p className={styles.login__form__row}>
            <label className={styles.login__form__row__label} htmlFor="email">
              E-mail
            </label>
            <input
              required
              className={clsx(styles.login__form__row__input, {
                [styles['login__form__row__input--incorrect']]: error,
              })}
              type="email"
              id="email"
              placeholder="Jan@przyklad.pl"
              onChange={(e) =>
                setLoginData((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
            />
          </p>
          <p className={styles.login__form__row}>
            <label
              className={styles.login__form__row__label}
              htmlFor="password"
            >
              Hasło:
            </label>
            <input
              required
              className={clsx(styles.login__form__row__input, {
                [styles['login__form__row__input--incorrect']]: error,
              })}
              type="password"
              id="password"
              placeholder="Hasło..."
              onChange={(e) =>
                setLoginData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </p>
          {error && (
            <p className={styles.login__form__errorMess}>{error?.detail}</p>
          )}
          <input
            value="Zaloguj"
            className={styles.login__form__submit}
            type="submit"
          />
        </form>
        <p>
          Nie masz jeszcze konta? <Link href={'/signIn'}>Zarejestruj sie!</Link>
        </p>
      </section>
    );
  } else {
    return (
      <section className={styles.login}>
        <UserInfo />
      </section>
    );
  }
};

export default LoginForm;
