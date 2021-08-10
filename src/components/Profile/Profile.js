import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Profile.module.scss';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';

function Profile() {
  const user = React.useContext(CurrentUserContext);
  const [isPopupOpened, setIsPopupOpened] = React.useState(false);

  const handleEditButtonClick = () => {
    setIsPopupOpened(true);
  };

  const handleCloseButtonClick = () => {
    setIsPopupOpened(false);
  };

  const handleUpdateUser = ({ name, email }) => {
    user.name = name;
    user.email = email;
    setIsPopupOpened(false);
  };

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
            onClick={handleEditButtonClick}>
            Редактировать
          </button>
          <Link
            to='/signin'
            className={cn(styles.button, styles.buttonSignOut)}>
            Выйти из аккаунта
          </Link>
        </div>
      </section>
      <EditProfilePopup
        isPopupOpened={isPopupOpened}
        onClose={handleCloseButtonClick}
        onUpdateUser={handleUpdateUser}/>
    </>
  );
}

export default Profile;
