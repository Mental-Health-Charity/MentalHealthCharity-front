import Link from 'next/link';
import styles from './DashBoard.module.scss';

const DashBoard = () => {
  return (
    <section className={styles.dashboard}>
      <h1 className={styles.dashboard__heading}>Panel administratora</h1>
      <p className={styles.dashboard__serverStatus}>
        status serwera: <span style={{ color: 'yellow' }}>NIEZNANY</span>
      </p>
      <div className={styles.dashboard__container}>
        <Link
          className={styles.dashboard__container__button}
          href="/admin/wyszukajUzytkownika"
        >
          Wyszukaj użytkownika
        </Link>
        <Link
          className={styles.dashboard__container__button}
          href="/admin/listaUzytkownikow"
        >
          Lista użytkowników
        </Link>
        <Link
          className={styles.dashboard__container__button}
          href="/admin/zarzadzajUzytkownikami"
        >
          Zarzadzaj użytkownikami
        </Link>
        <Link
          className={styles.dashboard__container__button}
          href="/admin/zarzadzajChatami"
        >
          Zarzadzaj chatami
        </Link>
        <Link className={styles.dashboard__container__button} href="/admin/CMS">
          Artykuły (CMS)
        </Link>
        <Link
          className={styles.dashboard__container__button}
          href="/admin/zarzadzajChatami"
        >
          Zarzadzanie rekrutacją
        </Link>
      </div>
    </section>
  );
};

export default DashBoard;
