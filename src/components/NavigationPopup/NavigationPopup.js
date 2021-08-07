import React from 'react';
import styles from './NavigationPopup.module.scss';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';

let cx = cn.bind(styles);

function NavigationPopup(props) {
  let popupClassName = cx({
    popup: true,
    popupOpened: props.isNavigationPopupOpened,
  });

  return (
    <div className={popupClassName}>
      <div className={styles.popupContent}>
        <nav className={styles.navBar}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link
                to="/"
                className={styles.link}
                onClick={props.onLinkClick}>
                Главная
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/movies"
                className={styles.link}
                onClick={props.onLinkClick}>
                Фильмы
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/saved-movies"
                className={styles.link}
                onClick={props.onLinkClick}>
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
        </nav>
        <Link
          to="/profile"
          className={styles.profileButton}
          onClick={props.onLinkClick}>
          <p className={styles.profileButtonText}>Аккаунт</p>
          <div className={styles.profileButtonIcon}> </div>
        </Link>
        <button type='button' className={styles.closeButton} onClick={props.onClose}> </button>
      </div>
    </div>
  )
}

export default NavigationPopup;
