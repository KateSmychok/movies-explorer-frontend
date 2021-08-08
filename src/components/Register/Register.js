import React from 'react';
import styles from './Register.module.scss';
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <section className={styles.registerPage}>
      <Link to='/' className={styles.logo}> </Link>
      <h2 className={styles.greeting}>Добро пожаловать!</h2>
      <form className={styles.form}>
        <label className={styles.label} for='name-register'>Имя</label>
        <input
          className={styles.baseInput}
          value={name}
          onChange={handleNameChange}
          id='name-register'
          name='name'
          type='text'
          minLength='6'
          maxLength='40'
          required
          autoComplete='off'/>
        <span className={styles.inputError} id='name-error'> </span>

        <label className={styles.label} for='email-register'>E-mail</label>
        <input
          className={styles.baseInput}
          value={email}
          onChange={handleEmailChange}
          id='email-register'
          name='email'
          type='email'
          minLength='6'
          maxLength='40'
          required
          autoComplete='off'/>
        <span className={styles.inputError} id='email-error'> </span>

        <label className={styles.label} for='password-register'>Пароль</label>
        <input
          className={styles.baseInput}
          value={password}
          onChange={handlePasswordChange}
          id='password-register'
          name='password'
          type='password'
          minLength='6'
          maxLength='15'
          required
          autoComplete='off'/>
        <span className={styles.inputError} id='password-error'> </span>

        <div className={styles.buttonWithCaption}>
          <button type='submit' className={styles.submitButton}>Зарегистрироваться</button>
          <div className={styles.questionWithLink}>
            <p className={styles.question}>Уже зарегистрированы?</p>
            <Link to="/signin" className={styles.link}>Войти</Link>
          </div>
        </div>
      </form>
    </section>
  )
}

export default Register;
