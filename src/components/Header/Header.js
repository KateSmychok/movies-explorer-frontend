import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import cn from 'classnames/bind';
import styles from './Header.module.scss';
import NavLink from '../NavLink/NavLink';

const cx = cn.bind(styles);

function Header(props) {
  const pathSignIn = () => {
    if (localStorage.getItem('token')) {
      return '/movies';
    }
    return '/signin';
  };

  const location = useLocation();

  const headerClassName = cx({
    header: true,
    headerOtherPages:
      location.pathname === '/movies'
      || location.pathname === '/saved-movies'
      || location.pathname === '/profile',
    headerMainPage: location.pathname === '/',
  });

  return (
    <>
      { !props.loggedIn
      && <div className={headerClassName}>
        <Link to="/" className={styles.logo}> </Link>
        <div className={styles.buttonsArea}>
          <Link to="/signup" className={styles.regButton}>Регистрация</Link>
          <Link to={pathSignIn} className={styles.authButton}>Войти</Link>
        </div>
        </div>
      }

      { props.loggedIn
      && <div className={headerClassName}>
        <div className={styles.leftSide}>
          <Link to="/" className={styles.logo}> </Link>
          <nav>
            <ul className={styles.navList}>
              <NavLink path={'/movies'} content={'Фильмы'}/>
              <NavLink path={'/saved-movies'} content={'Сохранённые фильмы'}/>
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
      }
    </>
  );
}

export default Header;
