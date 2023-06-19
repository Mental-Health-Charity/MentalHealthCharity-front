import styles from './CookiesNotification.module.scss';
import Image from 'next/image';
import cookiesIcon from '../../../../images/static/cookiesIcon.png';

const CookiesNotification = () => {
  return (
    <dialog className={styles.cookiesDialog}>
      <p className={styles.cookiesDialog__heading}>
        <Image width={50} src={cookiesIcon} alt={'Ikona ciasteczek'} />
        Ciasteczka
      </p>
      <p className={styles.cookiesDialog__desc}>
        Serwis wykorzystuje pliki cookies m.in. w celu poprawienia jej
        dostępności, personalizacji, obsługi kont użytkowników czy aby zbierać
        dane, dotyczące ruchu na stronie. Korzystając dalej z witryny zgadzasz
        się na ich wykorzystywanie.
      </p>
      <button
        className={styles.cookiesDialog__button}
        onClick={() => console.log('accepted')}
      >
        Rozumiem, zapamiętaj mój wybór
      </button>
    </dialog>
  );
};
