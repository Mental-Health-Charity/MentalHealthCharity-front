'use client';
import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import styles from './UsersList.module.scss';
import { use, useEffect, useState } from 'react';
import { User, useAuth } from '@/contexts/authProvider/Auth.provider';
import RowList from './rowList/RowList.component';
import Link from 'next/link';
import { infoPopUp } from '@/utils/defaultNotifications';

const UsersList = () => {
  const [users, setUsers] = useState<User[]>();
  const [limit, setLimit] = useState({
    from: 0,
    to: 8,
  });

  const { getUsers } = useAdmin();

  useEffect(() => {
    listUsers();
    console.log('downloading...');
    infoPopUp(
      'Uwaga, ta podstrona jest pod przebudową techniczną i nie działa poprawnie.',
    );
  }, []);

  const listUsers = async () => {
    const userArray = await getUsers(limit);
    setUsers(userArray);
    console.log(users);
  };

  return (
    <section className={styles.wrapper}>
      <Link className={styles.wrapper__return} href="/admin">
        &#x2190; Powrót do dashboard
      </Link>
      <h1 className={styles.wrapper__heading}>Globalna lista użytkowników</h1>
      <p className={styles.wrapper__heading}>
        załadowano {users ? users.length : 0} użytkowników
      </p>
      {users ? <input placeholder="wyszukaj (rola/id/email)" /> : null}
      <ul className={styles.wrapper__list}>
        {users?.map((user, index) => {
          return (
            <RowList
              key={index}
              email={user.email}
              id={user.id}
              role={user.user_role}
              name={user.full_name}
              isActive={user.is_active}
            />
          );
        })}
      </ul>
      <button className={styles.wrapper__submit} onClick={() => listUsers()}>
        Pobierz z bazy
      </button>
      <input
        onChange={(e) =>
          setLimit((prev) => ({
            ...prev,
            from:
              e.target.valueAsNumber === 0 || !e.target.valueAsNumber
                ? 0
                : e.target.valueAsNumber - 1,
          }))
        }
        placeholder="OD"
        type="number"
        className={styles.wrapper__input}
        min={1}
      />
      <input
        onChange={(e) =>
          setLimit((prev) => ({
            ...prev,
            to: !e.target.valueAsNumber ? 5 : e.target.valueAsNumber,
          }))
        }
        placeholder="ilosc"
        className={styles.wrapper__input}
        type="number"
      />
    </section>
  );
};

export default UsersList;
