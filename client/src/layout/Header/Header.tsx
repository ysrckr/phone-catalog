import Hamburger from '@/assets/icons/Union.svg';
import { MainLogo } from '@/components/MainLogo';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <MainLogo />
      <div className={styles.hamburger}>
        <img
          src={Hamburger}
          alt="mobile-nav-opener"
        />
      </div>
    </header>
  );
};
