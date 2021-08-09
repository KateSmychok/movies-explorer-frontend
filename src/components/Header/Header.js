import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './Header.module.scss';

function Header(props) {
  return (
    <Switch>
      <Route exact path='/'>
        <div className={cn(styles.header, styles.headerLanding)}>
          <Link to="/" className={styles.logo}> </Link>
          <div className={styles.buttonsArea}>
            <Link to="/signup" className={styles.regButton}>Регистрация</Link>
            <Link to="/signin" className={styles.authButton}>Войти</Link>
          </div>
        </div>
      </Route>
      <Route path='/movies'>
        <div className={cn(styles.header, styles.headerMain)}>
          <div className={styles.leftSide}>
            <Link to="/" className={cn(styles.logo, styles.logoMain)}> </Link>
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
            onClick={props.onClick}>
          </button>
        </div>
      </Route>
      <Route path='/saved-movies'>
        <div className={cn(styles.header, styles.headerMain)}>
          <div className={styles.leftSide}>
            <Link to="/" className={cn(styles.logo, styles.logoMain)}> </Link>
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
            onClick={props.onClick}>
          </button>
        </div>
      </Route>
      <Route path='/profile'>
        <div className={cn(styles.header, styles.headerMain)}>
          <div className={styles.leftSide}>
            <Link to="/" className={cn(styles.logo, styles.logoMain)}> </Link>
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
            onClick={props.onClick}>
          </button>
        </div>
      </Route>
    </Switch>
  );
}

export default Header;
