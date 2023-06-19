'use client';

import Image from 'next/image';
import Logo from '../../../../images/static/logo.png';
import DefaultButton from '@/common/components/common/defaultbutton/DefaultButton.component';
import { menuRoutes } from '@/utils/routes';
import NavLink from '../navLink/NavLink.component';
import MobileMenu from '../mobileMenu/MobileMenu.component';
import { useState } from 'react';
import styles from './Navbar.module.scss';
import clsx from 'clsx';
import { useAuth } from '@/contexts/authProvider/Auth.provider';
import Link from 'next/link';
import roles from '@/utils/roles';

const Navbar = () => {
  const [isMobileVisible, setIsMobileVisible] = useState(true);
  const { user } = useAuth();
  return (
    <nav
      className={clsx(styles.navbar, {
        [styles['navbar--unrolled']]: isMobileVisible,
      })}
    >
      <div className={styles.navbar__logoWrapper}>
        <Image
          className={styles.navbar__logo}
          priority
          alt="Logotype"
          src={Logo}
          width={'200'}
        />
        <MobileMenu
          setIsMobileVisible={setIsMobileVisible}
          isMobileVisible={isMobileVisible}
        />
      </div>
      <ul className={styles.navbar__buttonsWrapper}>
        {menuRoutes.map((item, idx) => (
          <NavLink name={item.name} key={idx} href={item.href} />
        ))}
      </ul>
      <div className={styles.navbar__authWrapper}>
        {user ? (
          <Link
            className={styles.navbar__authWrapper__loggedUser}
            href={'/login'}
          >
            <span
              aria-hidden="true"
              className={styles.navbar__authWrapper__loggedUser__dot}
            ></span>
            {user.user_role === roles.admin && '[admin] '}
            {user.full_name === '' ? 'Anonim' : user.full_name}
          </Link>
        ) : (
          <>
            <DefaultButton
              fillType={'white'}
              content={'Zaloguj'}
              href={'/login'}
              fontSize={'fsmall'}
            />
            <DefaultButton
              fillType={'yellow'}
              content={'Zarejestruj'}
              href={'/signIn'}
              fontSize={'fsmall'}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
