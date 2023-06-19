import { User } from '@/contexts/authProvider/Auth.provider';
import styles from './MergeUserPopUp.module.scss';
import arrow from '../../../../images/gif/scrolldown.gif';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { useAdmin } from '@/contexts/adminProvider/Admin.provider';
import { failurePopUp, successPopUp } from '@/utils/defaultNotifications';

interface MergeUserPopUpProps {
  user: User | undefined;
  editedUser: User | undefined;
  setShowPopUp: Dispatch<SetStateAction<boolean>>;
}

const MergeUserPopUp = ({
  user,
  editedUser,
  setShowPopUp,
}: MergeUserPopUpProps) => {
  const { editUser } = useAdmin();

  const editUserByAdmin = () => {
    if (user && user.id && editedUser) {
      delete editedUser.id;
      console.log(editedUser);

      try {
        editUser(user.id, editedUser);
        successPopUp('Edycja przebiegła pomyślnie.');
      } catch (error) {
        console.log(error);
        failurePopUp('Operacja przerwana, wystąpił problem.');
      }
    } else {
      window.alert('Użytkownik nie istnieje!');
    }
  };

  return (
    <section className={styles.popUp}>
      <div className={styles.popUp__wrapper}>
        <ul className={styles.popUp__wrapper__column}>
          <h3>Stan poprzedni:</h3>
          <li className={styles.popUp__wrapper__column__row}>
            Imie: {user?.full_name ? user?.full_name : 'anonim'}
          </li>
          <li className={styles.popUp__wrapper__column__row}>ID: {user?.id}</li>
          <li className={styles.popUp__wrapper__column__row}>
            E-mail: {user?.email}
          </li>
          <li className={styles.popUp__wrapper__column__row}>
            Uprawnienia: {user?.user_role}
          </li>
          <li className={styles.popUp__wrapper__column__row}>
            Status konta: {user?.is_active ? 'Odblokowany' : 'Zablokowany'}
          </li>
        </ul>
        <Image
          className={styles.popUp__wrapper__arrow}
          src={arrow}
          alt="arrow icon"
          width={40}
          height={40}
        />
        <ul className={styles.popUp__wrapper__column}>
          <h3>Stan zmodifikowany:</h3>
          <li className={styles.popUp__wrapper__column__row}>
            Imie: {editedUser?.full_name ? editedUser.full_name : 'anonim'}
          </li>
          <li className={styles.popUp__wrapper__column__row}>ID: {user?.id}</li>
          <li className={styles.popUp__wrapper__column__row}>
            E-mail: {editedUser?.email}
          </li>
          {editedUser?.password ? (
            <li className={styles.popUp__wrapper__column__row}>
              Haslo: {editedUser?.password}
            </li>
          ) : null}
          <li className={styles.popUp__wrapper__column__row}>
            Uprawnienia: {editedUser?.user_role}
          </li>
          <li className={styles.popUp__wrapper__column__row}>
            Status konta:{' '}
            {editedUser?.is_active ? 'Odblokowany' : 'Zablokowany'}
          </li>
        </ul>
      </div>
      <div>
        <button
          onClick={() => setShowPopUp(false)}
          className={styles.popUp__cancelButton}
        >
          Przerwij operacje
        </button>
        <button
          onClick={() => editUserByAdmin()}
          className={styles.popUp__sendButton}
        >
          Prześlij zmiany
        </button>
      </div>
    </section>
  );
};

export default MergeUserPopUp;
