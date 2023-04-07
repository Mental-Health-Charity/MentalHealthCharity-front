import Link from 'next/link';
import styles from './Hero.module.scss';
import DefaultButton from '@/common/components/common/defaultbutton/DefaultButton.component';
import HeroImage from './heroimage/HeroImage.component';
import MentalHealthImg from '../../../images/static/mhimg.png';
import MentalHealthImg2 from '../../../images/static/mhimg2.png';
import Image from 'next/image';
import FacebookIcon from '../../../images/static/facebook.png';
import InstagramIcon from '../../../images/static/instagram.png';
import ScrollDownIcon from '../../../images/gif/scrolldown.gif';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <main className={styles.hero__main}>
        {/* <HeroImage
          className={styles['hero__hero-image--left']}
          alt="mental health graphic"
          src={MentalHealthImg}
          width={350}
        /> */}
        <h1 className={styles.hero__heading}>Stowarzyszenie Juz Lepiej</h1>
        <h2>Przybywam w celu:</h2>
        <div className={styles.hero__buttons_wrapper}>
          <DefaultButton
            fontSize={'fmedium'}
            fillType={'white'}
            content={'Uzyskania pomocy'}
            href={'/mentee'}
          />
          <DefaultButton
            fontSize={'fmedium'}
            fillType={'navy'}
            content={'Niesienia pomocy'}
            href={'/volunteer'}
          />
        </div>
        <Image
          className={styles.hero__main__scrollicon}
          width={'30'}
          src={ScrollDownIcon}
          alt={''}
        />
      </main>
      <div className={styles.hero__social}>
        <Link target="blank" rel="noopener" href={'https://facebook.pl/'}>
          <Image width={32} src={FacebookIcon} alt={'facebook icon'} />
        </Link>
        <Link target="blank" rel="noopener" href={'https://instagram.pl/'}>
          <Image width={32} src={InstagramIcon} alt={'instagram icon'} />
        </Link>
      </div>

      {/* <HeroImage
        className={styles['hero__hero-image--right']}
        alt="mental health graphic"
        src={MentalHealthImg2}
        width={350}
      /> */}
    </section>
  );
};

export default Hero;
