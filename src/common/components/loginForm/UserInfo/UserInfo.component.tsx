import { useAuth } from '@/contexts/authProvider/Auth.provider';
import styles from './UserInfo.module.scss';
import { panelRoutes } from '@/utils/routes';
import Link from 'next/link';
import Image from 'next/image';
import defaultUserPic from '../../../images/static/user.png';
import Roles from '@/utils/roles';

const UserInfo = () => {
  const { user, logout } = useAuth();

  const getUserRole = () => {
    switch (user?.user_role) {
      case Roles.user:
        return panelRoutes.menteePanel;
      case Roles.volunteer:
        return panelRoutes.volunteerPanel;
      case Roles.admin:
        return panelRoutes.adminPanel;
      default:
        return '#';
    }
  };

  return (
    <div className={styles.userWrapper}>
      <Image
        src={defaultUserPic}
        alt={'Zdjęcie profilowe'}
        width={60}
        height={60}
      />
      <h1>Ustawienia konta:</h1>
      <ul className={styles.userWrapper__list}>
        <li className={styles.userWrapper__list__item}>
          <p className={styles.userWrapper__list__item__label}>
            Twój unikalny identyfikator (ID):
          </p>
          <p className={styles.userWrapper__list__item__value}>{user?.id}</p>
        </li>
        <li className={styles.userWrapper__list__item}>
          <p className={styles.userWrapper__list__item__label}>Imie:</p>
          <p className={styles.userWrapper__list__item__value}>
            {user?.full_name === '' ? 'Anonim' : user?.full_name}
          </p>
        </li>
        <li className={styles.userWrapper__list__item}>
          <p className={styles.userWrapper__list__item__label}>Adres e-mail:</p>
          <p className={styles.userWrapper__list__item__value}>{user?.email}</p>
        </li>
        <li className={styles.userWrapper__list__item}>
          <p className={styles.userWrapper__list__item__label}>status konta:</p>
          <p className={styles.userWrapper__list__item__value}>
            {user?.is_active === true
              ? 'Brak blokad konta'
              : 'Konto zablokowane!'}
          </p>
        </li>
        <li className={styles.userWrapper__list__item}>
          <p className={styles.userWrapper__list__item__label}>Uprawnienia:</p>
          <p className={styles.userWrapper__list__item__value}>
            {user?.user_role}
          </p>
        </li>
      </ul>
      <input
        className={styles.userWrapper__logout}
        value="Wyloguj"
        type="submit"
        onClick={logout}
      />
      <div className={styles.userWrapper__suggest}>
        <p className={styles.userWrapper__suggest__desc}>Sugestie:</p>
        <Link
          className={styles.userWrapper__suggest__link}
          href={getUserRole()}
        >
          {' '}
          Twój panel!
        </Link>
        <Link className={styles.userWrapper__suggest__link} href="/regulamin">
          Regulamin serwisu
        </Link>
      </div>
    </div>
  );
};

export default UserInfo;
