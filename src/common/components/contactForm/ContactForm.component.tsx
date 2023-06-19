'use client';
import { FormEvent, useState } from 'react';
import styles from './ContactForm.module.scss';
import { failurePopUp } from '@/utils/defaultNotifications';
import Link from 'next/link';

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [message, setMessage] = useState('');

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    failurePopUp('Brak podłączonej obsługi formularzy!');
  };

  return (
    <section className={styles.formWrapper}>
      <h2 className={styles.formWrapper__heading}>Formularz kontaktowy</h2>
      <p className={styles.formWrapper__desc}>
        Wyślij wiadomość bezpośrednio do administracji serwisu
      </p>
      <form
        onSubmit={(e) => handleForm(e)}
        className={styles.formWrapper__form}
      >
        <label className={styles.formWrapper__form__label} htmlFor="name">
          Imię
        </label>
        <input
          className={styles.formWrapper__form__input}
          type="text"
          id="name"
          name="name"
        />

        <label className={styles.formWrapper__form__label} htmlFor="surname">
          Nazwisko
        </label>
        <input
          className={styles.formWrapper__form__input}
          type="text"
          id="surname"
          name="surname"
        />

        <label className={styles.formWrapper__form__label} htmlFor="email">
          Adres email
        </label>
        <input
          className={styles.formWrapper__form__input}
          type="email"
          id="email"
          name="email"
        />

        <label className={styles.formWrapper__form__label} htmlFor="about">
          Wiadomość
        </label>
        <textarea
          className={styles.formWrapper__form__input}
          id="about"
          name="about"
          placeholder="Wiadomość..."
        />

        <input
          className={styles.formWrapper__form__submit}
          type="submit"
          value={'Wyślij'}
        />
      </form>

      <h2 className={styles.formWrapper__subContactHeading}>Lub...</h2>
      <ul className={styles.formWrapper__subContactList}>
        <li className={styles.formWrapper__subContactList__option}>
          <Link
            className={styles.formWrapper__subContactList__option__link}
            href={'mailto:fundacja@fundacja.org'}
          >
            fundacja@fundacja.org
          </Link>
        </li>
        <li className={styles.formWrapper__subContactList__option}>
          <Link
            className={styles.formWrapper__subContactList__option__link}
            href={'mailto:fundacjaIT@fundacja.org'}
          >
            fundacjaIT@fundacja.org
          </Link>
        </li>
        <li className={styles.formWrapper__subContactList__option}>
          <Link
            className={styles.formWrapper__subContactList__option__link}
            href={'mailto:fundacjaRekrutacja@fundacja.org'}
          >
            fundacjaRekrutacja@fundacja.org
          </Link>
        </li>
        <li className={styles.formWrapper__subContactList__option}>
          <Link
            className={styles.formWrapper__subContactList__option__link}
            href={'mailto:fundacjaAdmin@fundacja.org'}
          >
            fundacjaAdmin@fundacja.org
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default ContactForm;
