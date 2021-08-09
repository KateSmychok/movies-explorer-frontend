import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.scss';
import LoginForm from '../LoginForm/LoginForm';

function Login() {
  return (
    <section className={styles.loginPage}>
      <Link to='/' className={styles.logo}> </Link>
      <h2 className={styles.greeting}>Рады видеть!</h2>
      <LoginForm />
    </section>
  );
}

export default Login;
