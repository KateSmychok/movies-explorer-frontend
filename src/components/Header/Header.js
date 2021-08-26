import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import cn from 'classnames/bind';
import styles from './Header.module.scss';

const cx = cn.bind(styles);

function Header(props) {
  const pathSignIn = () => {
    if (localStorage.getItem('token')) {
      return '/movies';
    }
    return '/signin';
  };

  const location = useLocation();
  const headerClassNameLanding = cx({
    headerLanding: location.pathname === '/',
    headerLandingHidden:
      location.pathname === '/movies'
      || location.pathname === '/saved-movies'
      || location.pathname === '/profile',
  });

  const headerClassNameMain = cx({
    headerMain:
      location.pathname === '/movies'
      || location.pathname === '/saved-movies'
      || location.pathname === '/profile',
    headerMainHidden: location.pathname === '/',
  });

  return (
    <>
      <div className={headerClassNameLanding}>
        <Link to="/" className={styles.logo}> </Link>
        <div className={styles.buttonsArea}>
          <Link to="/signup" className={styles.regButton}>Регистрация</Link>
          <Link to={pathSignIn} className={styles.authButton}>Войти</Link>
        </div>
      </div>

      <div className={headerClassNameMain}>
        <div className={styles.leftSide}>
          <Link to="/" className={styles.logo}> </Link>
          <nav>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link to="/movies" className={styles.link}>Фильмы</Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/saved-movies" className={styles.link}>Сохранённые фильмы</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Link to="/profile" className={styles.profileButton}>
          <p className={styles.profileButtonText}>Аккаунт</p>
          <div className={styles.profileButtonIcon}> </div>
        </Link>
        <button
          className={styles.burgerMenu}
          type='button'
          onClick={props.onBurgerMenuClick}>
        </button>
      </div>
    </>
  );
}

export default Header;
