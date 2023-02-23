import { uiState } from '@/store/uiState';
import cn from 'classnames';
import { AnimatePresence,motion } from 'framer-motion';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';
import { Link,NavLink,useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import styles from './MobileNav.module.scss';

export const MobileNav = () => {
  const { isMobileNavOpen, toggleMobileNav } = useSnapshot(uiState);
  const location = useLocation();

  return (
    <AnimatePresence>
      {isMobileNavOpen && (
        <motion.aside
          initial={{ opacity: 0, overflow: 'auto' }}
          animate={{ opacity: 1, overflow: 'hidden' }}
          exit={{ opacity: 0, overflow: 'auto' }}
          className={styles.container}
        >
          <nav className={styles.nav}>
            <ul className={styles.nav_list}>
              <li className={styles.nav_item}>
                <NavLink
                  to="/"
                  className={cn(styles.nav_link, {
                    [styles.nav_link_active]: location.pathname === '/',
                  })}
                  onClick={toggleMobileNav}
                >
                  Home
                </NavLink>
              </li>
              <li className={styles.nav_item}>
                <NavLink
                  to="/phones"
                  className={cn(styles.nav_link, {
                    [styles.nav_link_active]:
                      location.pathname.match('/phones'),
                  })}
                  onClick={toggleMobileNav}
                >
                  Phones
                </NavLink>
              </li>
              <li className={styles.nav_item}>
                <NavLink
                  to="/tablets"
                  className={cn(styles.nav_link, {
                    [styles.nav_link_active]:
                      location.pathname.match('/tablets'),
                  })}
                  onClick={toggleMobileNav}
                >
                  Tablets
                </NavLink>
              </li>
              <li className={styles.nav_item}>
                <NavLink
                  to="/accessories"
                  className={cn(styles.nav_link, {
                    [styles.nav_link_active]:
                      location.pathname.match('/accessories'),
                  })}
                  onClick={toggleMobileNav}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={styles.footer}>
            <div
              className={cn(styles.favorites, {
                [styles.favorites_active]: location.pathname === '/favorites',
              })}
            >
              <Link
                to="/favorites"
                className={styles.icon}
                onClick={toggleMobileNav}
              >
                <AiOutlineHeart />
              </Link>
            </div>
            <div
              className={cn(styles.cart, {
                [styles.cart_active]: location.pathname === '/cart',
              })}
            >
              <Link
                to="/cart"
                className={styles.icon}
                onClick={toggleMobileNav}
              >
                <FiShoppingBag />
              </Link>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
