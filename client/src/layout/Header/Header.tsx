import { GiHamburgerMenu } from 'react-icons/gi';
import {RxCross1} from 'react-icons/rx';
import { MainLogo } from '@/components/MainLogo';
import styles from './Header.module.scss';
import { uiState } from '@/store/uiState';
import { useSnapshot } from 'valtio';

export const Header = () => {
  const { isMobileNavOpen, toggleMobileNav } = useSnapshot(uiState);

  return (
    <header className={styles.header}>
      <MainLogo />
      <div className={styles.hamburger}>
        <button onClick={toggleMobileNav}>
          {isMobileNavOpen ? <RxCross1 /> : <GiHamburgerMenu />}
        </button>
      </div>
    </header>
  );
};
