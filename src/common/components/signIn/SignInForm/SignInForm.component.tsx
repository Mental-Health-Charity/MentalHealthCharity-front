'use client';
import Link from 'next/link';
import styles from './SignInForm.module.scss';
import { FormEvent, useState } from 'react';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import { infoPopUp } from '@/utils/defaultNotifications';

const SignInForm = () => {
  const { signIn, error } = useAuth();
  const [formSubmited, setFormSubmited] = useState(false);
  const [userData, setUserData] = useState({
    full_name: '',
    password: '',
    email: '',
  });

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData);
    try {
      signIn(userData);
    } catch (error) {
      console.log(error);
    }
    setFormSubmited(true);
  };

  return (
    <section className={styles.signin}>
      <h1 className={styles.signin__heading}>Utwórz nowe konto</h1>

      <form onSubmit={(e) => handleRegister(e)} className={styles.signin__form}>
        <p className={styles.signin__form__row}>
          <label className={styles.signin__form__row__label} htmlFor="username">
            Imię
          </label>
          <input
            required
            className={styles.signin__form__row__input}
            id="username"
            type="text"
            placeholder="Jan"
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                full_name: e.target.value,
              }))
            }
          />
        </p>
        <p className={styles.signin__form__row}>
          <label className={styles.signin__form__row__label} htmlFor="email">
            E-mail
          </label>
          <input
            required
            className={styles.signin__form__row__input}
            id="email"
            type="email"
            placeholder="Jan@przyklad.pl"
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        </p>
        <p className={styles.signin__form__row}>
          <label className={styles.signin__form__row__label} htmlFor="password">
            Hasło
          </label>
          <input
            required
            className={styles.signin__form__row__input}
            id="password"
            type="password"
            placeholder="Hasło..."
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </p>
        <p>
          <input
            className={styles.signin__form__submit}
            type="submit"
            value="Utwórz"
          />
        </p>
        {error === undefined && formSubmited && (
          <p className={styles.signin__form__success}>
            Konto zostało utworzone! <Link href="/login">Zaloguj się.</Link>
          </p>
        )}

        <p>
          <label className={styles.signin__form__row__label} htmlFor="checkbox">
            Akceptuję Regulamin oraz Polityką prywatności oraz potwierdzam
            zapoznanie się z postanowieniami tych dokumentów.
          </label>
          <input
            className={styles.signin__form__label}
            id="checkbox"
            type="checkbox"
          />
        </p>
      </form>
      <p>
        Masz już konto? <Link href="/login">Zaloguj</Link>
      </p>
    </section>
  );
};

export default SignInForm;
