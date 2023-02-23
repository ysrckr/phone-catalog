import { MainLogo } from '@/components/MainLogo';
import { uiState } from '@/store/uiState';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross1 } from 'react-icons/rx';
import { useSnapshot } from 'valtio';
import styles from './Header.module.scss';

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
