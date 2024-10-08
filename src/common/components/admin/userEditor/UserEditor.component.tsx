'use client';
import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import styles from './UserEditor.module.scss';
import { useEffect, useState } from 'react';
import { EditUser, User } from '@/contexts/authProvider/Auth.provider';
import userInit from '@/utils/userInit';
import Link from 'next/link';
import { failurePopUp } from '@/utils/defaultNotifications';
import Roles from '@/utils/roles';
import MergeUserModal from './mergeUserModal/MergeUserModal.component';
import Loader from '../../common/Loader/Loader.component';
import { useDebounce } from 'use-debounce';

const UserEditor = () => {
  const { getUserById } = useAdmin();

  const [targetUser, setTargetUser] = useState<User>();
  const [editedTargetUser, setEditedTargetUser] = useState<EditUser>({
    full_name: targetUser ? targetUser.full_name : userInit.full_name,
    is_active: targetUser ? targetUser.is_active : userInit.is_active,
    user_role: targetUser ? targetUser.user_role : userInit.user_role,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [targetId, setTargetId] = useState<number>();
  const [debouncedId] = useDebounce(targetId, 1000);

  const getUserByAdmin = async (ID: number) => {
    setIsLoading(true);
    try {
      const result = await getUserById(ID);
      setTargetUser(result);
      setEditedTargetUser(result);
    } catch (err) {
      failurePopUp('Nie znaleziono użytkownika o podanym ID');
      console.error(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (debouncedId) {
      getUserByAdmin(debouncedId);
    }
  }, [debouncedId]);

  return (
    <section className={styles.wrapper}>
      <Link className={styles.wrapper__return} href="/admin">
        &#x2190; Powrót do dashboard
      </Link>
      <div className={styles.wrapper__editor}>
        <div className={styles.wrapper__editor__heading}>
          <h1>Edytuj użytkownika</h1>
          <input
            type="number"
            placeholder="ID użytkownika docelowego"
            onChange={(e) => {
              setTargetId(parseInt(e.target.value));
              setIsLoading(true);
            }}
            min={0}
            inputMode="numeric"
            step="1"
          />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          targetUser && (
            <form
              className={styles.wrapper__editor__form}
              onSubmit={(e) => {
                e.preventDefault();
                if (targetUser && editedTargetUser) {
                  setIsModalVisible(true);
                } else {
                  failurePopUp('Wprowadź dane użytkownika docelowego');
                }
              }}
            >
              <p className={styles.wrapper__editor__form__row}>
                <label className={styles.wrapper__editor__form__label}>
                  imie:
                </label>
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
                  email:
                </label>
                <input
                  className={styles.wrapper__editor__form__input}
                  type="text"
                  value={targetUser.email}
                  disabled
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
                      user_role: e.target.value as Roles,
                    }));
                  }}
                  defaultValue={'default'}
                >
                  <option value={targetUser.user_role}>
                    Pozostaw bez zmian
                  </option>
                  <option value={Roles.user}>Użytkownik</option>
                  <option value={Roles.volunteer}>Wolontariusz</option>
                  <option value={Roles.admin}>Admin</option>
                  <option value={Roles.redactor}>Redaktor</option>
                  <option value={Roles.supervisor}>Supervisor</option>
                  <option value={Roles.coordinator}>Koordynator</option>
                </select>
              </p>
              <input
                className={styles.wrapper__editor__form__submit}
                type="submit"
                value="Wyślij zmiany"
              />
            </form>
          )
        )}
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
