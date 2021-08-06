import React from 'react';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <section className={styles.loginPage}>
      <Link to='/' className={styles.logo}></Link>
      <h2 className={styles.greeting}>Рады видеть!</h2>
      <form className={styles.form}>
        <span className={styles.placeholder}>E-mail</span>
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
        <span className={styles.inputError} id='email-error'></span>

        <span className={styles.placeholder}>Пароль</span>
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
        <span className={styles.inputError} id='password-error'></span>

        <button type='submit' className={styles.submitButton}>Войти</button>
      </form>
      <div className={styles.questionWithLink}>
        <p className={styles.question}>Ещё не зарегистрированы?</p>
        <Link to="/signup" className={styles.link}>Регистрация</Link>
      </div>
    </section>
  )
}

export default Login;
