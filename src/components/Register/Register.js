import React from 'react';
import styles from './Register.module.scss';
import { Link } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function Register() {
  return (
    <section className={styles.registerPage}>
      <Link to='/' className={styles.logo}> </Link>
      <h2 className={styles.greeting}>Добро пожаловать!</h2>
      <RegisterForm />
    </section>
  )
}

export default Register;
