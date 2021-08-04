import React from 'react';
import styles from './Profile.module.scss';
import cn from 'classnames';

function Profile() {
  return (
    <section className={styles.profileSection}>
      <h2 className={styles.title}>
        Привет, Катя!
      </h2>
      <div className={styles.userInfo}>
        <div className={styles.userInfoLine}>
          <p className={cn(styles.userInfoText, styles.userInfoTextKey)}>Имя</p>
          <p className={cn(styles.userInfoText, styles.userInfoTextValue)}>Катя</p>
        </div>
        <div className={styles.userInfoLine}>
          <p className={cn(styles.userInfoText, styles.userInfoTextKey)}>E-mail</p>
          <p className={cn(styles.userInfoText, styles.userInfoTextValue)}>kate@yandex.ru</p>
        </div>
      </div>
      <button className={cn(styles.button, styles.buttonEdit)}>Редактировать</button>
      <button className={cn(styles.button, styles.buttonSignOut)}>Выйти из аккаунта</button>
    </section>
  )
}

export default Profile;
