'use client';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../../images/static/logo.png';
import InstagramLogo from '../../../../images/static/instagram.png';
import FacebookLogo from '../../../../images/static/facebook.png';
import styles from './Footer.module.scss';
import { ToastContainer } from 'react-toastify';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.footer__block}>
        <li>
          <button className={styles.footer__block__item}>O nas</button>
        </li>
        <li>
          <Link
            className={styles.footer__block__item}
            href="/przydatne-materialy"
          >
            Przydatne materiały
          </Link>
        </li>
        <li>
          <Link className={styles.footer__block__item} href="/kontakt">
            Kontakt
          </Link>
        </li>
      </ul>
      <div className={styles.footer__block}>
        <Image src={Logo} alt="Logo" />
      </div>
      <ul className={styles.footer__block}>
        <li>
          <Link
            className={styles.footer__block__item}
            target="_blank"
            rel="noopener"
            href="https://instagram.com"
          >
            Nazwa
            <Image width={32} src={InstagramLogo} alt="Instagram icon" />
          </Link>
        </li>
        <li>
          <Link
            className={styles.footer__block__item}
            target="_blank"
            rel="noopener"
            href="https://facebook.com"
          >
            Nazwa
            <Image width={32} src={FacebookLogo} alt="Facebook icon" />
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
