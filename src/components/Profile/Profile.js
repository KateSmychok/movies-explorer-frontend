import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Profile.module.scss';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';

function Profile(props) {
  const user = React.useContext(CurrentUserContext);

  return (
    <>
      <section className={styles.profileSection}>
        <h2 className={styles.title}>
          Привет, {user.name}!
        </h2>
        <div className={styles.userInfo}>
          <div className={styles.userInfoLine}>
            <p className={cn(styles.userInfoText, styles.userInfoTextKey)}>Имя</p>
            <p className={cn(styles.userInfoText, styles.userInfoTextValue)}>{user.name}</p>
          </div>
          <div className={styles.userInfoLine}>
            <p className={cn(styles.userInfoText, styles.userInfoTextKey)}>E-mail</p>
            <p className={cn(styles.userInfoText, styles.userInfoTextValue)}>{user.email}</p>
          </div>
        </div>
        <div className={styles.buttons}>
          <button
            type='button'
            className={cn(styles.button, styles.buttonEdit)}
            onClick={props.onEditButtonClick}>
            Редактировать
          </button>
          <button
            className={cn(styles.button, styles.buttonSignOut)}
            onClick={props.onSignOut}>
            Выйти из аккаунта
          </button>
        </div>
      </section>
    </>
  );
}

export default Profile;
