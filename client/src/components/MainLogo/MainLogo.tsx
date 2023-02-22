import { Link } from 'react-router-dom';
import styles from './MainLogo.module.scss';

export const MainLogo = () => {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.text}>
        <span>NICE👌</span>
        <br />
        <span>GADGETS</span>
      </Link>
    </div>
  );
};
