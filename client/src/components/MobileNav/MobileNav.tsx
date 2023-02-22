import { NavLink } from 'react-router-dom';
import styles from './MobileNav.module.scss';

export const MobileNav = () => {
  return (
    <div>
      <nav className={styles.nav}>
        <ul className={styles.navlist}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/phones">Phones</NavLink>
          </li>
          <li>
            <NavLink to="/tablets">Tablets</NavLink>
          </li>
          <li>
            <NavLink to="/accesories">Accessories</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
