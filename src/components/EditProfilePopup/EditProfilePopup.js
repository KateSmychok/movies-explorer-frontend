import React from 'react';
import cn from 'classnames/bind';
import styles from './EditProfilePopup.module.scss';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const cx = cn.bind(styles);

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const user = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({
      name,
      email,
    });
  }

  const popupClassName = cx({
    overlay: true,
    opened: props.isEditPopupOpened,
  });

  return (
    <div className={popupClassName}>
      <div className={styles.content}>
        <h3 className={styles.title}>Редактировать профиль</h3>
        <form
          name='profile'
          className={styles.form}
          onSubmit={handleSubmit}>
          <input
            className={styles.input}
            value={name || ''}
            onChange={handleNameChange}
            id='name'
            autoComplete='off'
            type='text'
            name='name'
            placeholder='Имя'
            minLength='2'
            maxLength='40'
            required />
          <span className={styles.inputError} id='name-error'> </span>
          <input
            className={styles.input}
            value={email || ''}
            onChange={handleEmailChange}
            id='email'
            autoComplete='off'
            type='text'
            name='email'
            placeholder='Email'
            minLength='6'
            maxLength='40'
            required />
          <span className={styles.inputError} id='email-error'> </span>
          <button
            type='submit'
            className={styles.submitButton}
            onSubmit={handleSubmit}>
            Сохранить
          </button>
        </form>
        <button
          type='button'
          className={styles.closeButton}
          onClick={props.onClose}>
        </button>
      </div>
    </div>
  );
}

export default EditProfilePopup;
