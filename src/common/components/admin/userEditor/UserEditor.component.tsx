'use client';

import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import RowList from '../usersList/rowList/RowList.component';
import styles from './UserEditor.module.scss';
import { useEffect, useState } from 'react';
import { User } from '@/contexts/authProvider/Auth.provider';
import Image from 'next/image';
import VerifyIcon from '../../../images/static/check.png';
import { MouseEvent } from 'react';
import userInit from '@/utils/userInit';
import MergeUserPopUp from './mergeUserPopUp/MergeUserPopUp.component';
import Link from 'next/link';
import { infoPopUp } from '@/utils/defaultNotifications';

const UserEditor = () => {
  const { getUserById } = useAdmin();
  const [targetUser, setTargetUser] = useState<User>();
  const [editedTargetUser, setEditedTargetUser] = useState<User>(userInit);
  const [editOpt, setEditOpt] = useState<string>('elo');

  const getUserByAdmin = async (ID: number) => {
    const result = await getUserById(ID);
    setTargetUser(result);
    setEditedTargetUser(result);
  };

  const handleChanges = (value: string) => {
    switch (editOpt) {
      case 'email':
        setEditedTargetUser((prev) => ({
          ...prev,
          email: value,
        }));
        break;
      case 'name':
        setEditedTargetUser((prev) => ({
          ...prev,
          name: value,
        }));
        break;
    }
  };

  useEffect(() => {
    infoPopUp(
      'Uwaga, funkcja edycji użytkownika wymaga poprawy technicznej, na ten moment WYMUSZA zmiany hasła, używaj rozważnie.',
    );
  }, []);

  // const handleMerge = (e: MouseEvent) => {
  //   e.preventDefault();
  //   // conditional: prevents admins mistake:
  //   if (userEmail === user?.email && user) {
  //     console.log('edited user data: ', newUser);
  //     console.log('selected user: ', user);
  //     setShowPopUp(true);
  //   } else
  //     window.alert(
  //       'Dane użytkownika nie są zgodne. Uzupełnij dane, aby przeprowadzić edycję.',
  //     );
  // };

  return (
    <section className={styles.wrapper}>
      <Link className={styles.wrapper__return} href="/admin">
        &#x2190; Powrót do dashboard
      </Link>
      <div>
        <div>
          <input
            onChange={(e) => {
              getUserByAdmin(e.target.valueAsNumber);
            }}
            type="number"
            placeholder="ID"
          />
          <input type="e-mail" placeholder="e-mail" />
          <RowList
            email={targetUser?.email}
            id={targetUser?.id}
            role={targetUser?.user_role}
            name={targetUser?.full_name}
            isActive={targetUser?.is_active}
          />
        </div>
        <div>
          <button onClick={() => setEditOpt('email')}>zmień e-mail</button>
          <button onClick={() => setEditOpt('name')}>zmień imie</button>
          <button onClick={() => setEditOpt('role')}>zmień uprawnienia</button>
          <button onClick={() => setEditOpt('password')}>zmień hasło</button>
          <button onClick={() => setEditOpt('active')}>zmień status</button>
        </div>
        <input onChange={() => console.log('change')} />
      </div>
    </section>
  );
};

export default UserEditor;
