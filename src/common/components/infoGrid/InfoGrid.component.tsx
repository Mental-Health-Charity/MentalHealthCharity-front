import Image from 'next/image';
import styles from './InfoGrid.module.scss';
import ExampleImage from '../../images/static/mhimg.png';
import ExampleImage2 from '../../images/static/mhimg2.png';
import Floating from '../common/floating/Floating.component';
import SeaWeedIcon from '../../images/gif/seaweed.gif';
import ShellIcon from '../../images/gif/shell.gif';

const InfoGrid = () => {
  return (
    <section className={styles.infoGrid}>
      <h2 className={styles.infoGrid__heading}>Jak to działa?</h2>
      <div className={styles.infoGrid__blocksWrapper}>
        <article className={styles.infoGrid__blocksWrapper__block}>
          <Image
            className={styles.infoGrid__blocksWrapper__block__image}
            src={ExampleImage}
            alt={'Grafika zdrowie psychiczne'}
            width={200}
            height={200}
          />
          <p>Lorem ipsum, lorem lorem</p>
        </article>
        <article className={styles.infoGrid__blocksWrapper__block}>
          <Image
            className={styles.infoGrid__blocksWrapper__block__image}
            src={ExampleImage2}
            alt={'Grafika zdrowie psychiczne'}
            width={200}
            height={200}
          />
          <p>Ipsum, ipsum lorem, lorem</p>
        </article>
        <article className={styles.infoGrid__blocksWrapper__block}>
          <Image
            className={styles.infoGrid__blocksWrapper__block__image}
            src={ExampleImage}
            alt={'Grafika zdrowie psychiczne'}
            width={200}
            height={200}
          />
          <p>Lorem ipsum, ipsum ipsum</p>
        </article>
      </div>
      <Floating offsetLeft={68} offsetTop={102} icon={SeaWeedIcon} />
      <Floating offsetLeft={26} offsetTop={110} icon={ShellIcon} />
    </section>
  );
};

export default InfoGrid;
