'use client';

import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import RowList from '../usersList/rowList/RowList.component';
import styles from './UserEditor.module.scss';
import { useEffect, useState } from 'react';
import { User } from '@/contexts/authProvider/Auth.provider';
import userInit from '@/utils/userInit';
import Link from 'next/link';
import { failurePopUp, infoPopUp } from '@/utils/defaultNotifications';
import Roles from '@/utils/roles';
import MergeUserModal from './mergeUserModal/MergeUserModal.component';

const UserEditor = () => {
  // !!! WARNING !!!
  // Component temporarily unsupported by backend bugs
  // !!! WARNING !!!
  const { getUserById } = useAdmin();
  const [targetUser, setTargetUser] = useState<User>();
  const [editedTargetUser, setEditedTargetUser] = useState<User>(
    targetUser ? targetUser : userInit,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getUserByAdmin = async (ID: number) => {
    const result = await getUserById(ID);
    setTargetUser(result);
    setEditedTargetUser(result);
  };

  useEffect(() => {
    infoPopUp(
      'Uwaga, funkcja edycji użytkownika wymaga poprawy technicznej z strony backendu, na ten moment WYMUSZA zmiany hasła, używaj rozważnie.',
    );
  }, []);

  return (
    <section className={styles.wrapper}>
      <Link className={styles.wrapper__return} href="/admin">
        &#x2190; Powrót do dashboard
      </Link>
      <div className={styles.wrapper__editor}>
        <div className={styles.wrapper__editor__heading}>
          <h1>Edytuj użytkownika | wprowadź ID</h1>
          <input
            type="number"
            placeholder="ID użytkownika docelowego"
            onChange={(e) => getUserByAdmin(e.target.valueAsNumber)}
          />
        </div>
        <form
          className={styles.wrapper__editor__form}
          onSubmit={(e) => {
            e.preventDefault();
            if (
              targetUser &&
              editedTargetUser &&
              editedTargetUser.password !== ''
            ) {
              setIsModalVisible(true);
            } else {
              failurePopUp(
                'Wprowadź dane użytkownika docelowego (hasło, id, i opcjonalne)',
              );
            }
          }}
        >
          <p className={styles.wrapper__editor__form__row}>
            <label className={styles.wrapper__editor__form__label}>imie:</label>
            <input
              className={styles.wrapper__editor__form__input}
              type="text"
              placeholder="Wpisz imie..."
              value={editedTargetUser?.full_name}
              onChange={(e) => {
                setEditedTargetUser((prev) => ({
                  ...prev,
                  full_name: e.target.value,
                }));
              }}
            />
          </p>
          <p className={styles.wrapper__editor__form__row}>
            <label className={styles.wrapper__editor__form__label}>
              e-mail:
            </label>
            <input
              className={styles.wrapper__editor__form__input}
              type="text"
              placeholder="Wpisz email..."
              value={editedTargetUser?.email}
              onChange={(e) => {
                setEditedTargetUser((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
            />
          </p>
          <p className={styles.wrapper__editor__form__row}>
            <label className={styles.wrapper__editor__form__label}>
              hasło:
            </label>
            <input
              className={styles.wrapper__editor__form__input}
              required
              type="text"
              placeholder="Wpisz hasło..."
              value={editedTargetUser?.password}
              onChange={(e) => {
                setEditedTargetUser((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
          </p>
          <p className={styles.wrapper__editor__form__row}>
            <label className={styles.wrapper__editor__form__label}>
              uprawnienia:
            </label>
            <select
              className={styles.wrapper__editor__form__select}
              onChange={(e) => {
                setEditedTargetUser((prev) => ({
                  ...prev,
                  user_role: e.target.value,
                }));
              }}
              defaultValue={'default'}
            >
              <option value={'default'} disabled>
                Zmień/pozostaw bez zmian
              </option>
              <option value={Roles.user}>Użytkownik</option>
              <option value={Roles.volunteer}>Wolontariusz</option>
              <option value={Roles.admin}>Admin</option>
            </select>
          </p>
          <input
            className={styles.wrapper__editor__form__submit}
            type="submit"
            value="Wyślij zmiany"
          />
        </form>
      </div>
      {isModalVisible && (
        <MergeUserModal
          setIsModalVisible={setIsModalVisible}
          targetEditedUserData={editedTargetUser}
          targetUserData={targetUser}
        />
      )}
    </section>
  );
};

export default UserEditor;
