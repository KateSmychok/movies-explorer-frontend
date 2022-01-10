import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';
import styles from './Login.module.scss';
import { LoginSchema } from '../../utils/validationSchemas';

const cx = cn.bind(styles);

function Login(props) {
  return (
    <div className={styles.loginPage}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}

        validationSchema={LoginSchema}

        onSubmit={ (values) => {
          props.onSubmit({
            email: values.email,
            password: values.password,
          });
        }}
      >
        {({
          errors,
          touched,
          dirty,
          isValid,
        }) => (
          <Form className={styles.form}>
            <Link to='/' className={styles.logo}> </Link>
            <h2 className={styles.greeting}>Привет!</h2>
            <label className={styles.label} htmlFor='email'>E-mail</label>
            <Field
              name='email'
              type='email'
              className={cx({
                baseInput: true,
                inputValid: !errors.email && touched.email,
                inputInvalid: errors.email && touched.email,
              })}
              id='email-login'
              autoComplete='off'
            />
            {errors.email && touched.email ? (
              <span className={styles.inputError}>
                {errors.email}</span>
            ) : <span className={styles.inputError}> </span>
            }

            <label className={styles.label} htmlFor='password'>Пароль</label>
            <Field
              name='password'
              type='password'
              className={cx({
                baseInput: true,
                inputValid: !errors.password && touched.password,
                inputInvalid: errors.password && touched.password,
              })}
              id='password-login'
              autoComplete='off'
            />
            {errors.password && touched.password ? (
              <span className={styles.inputError}>
                {errors.password}</span>
            ) : <span className={styles.inputError}> </span>
            }

            {props.errMessageIsVisible && <p className={styles.errText}>{props.errMessage}</p>}

            <div className={styles.buttonWithCaption}>
              <button type='submit' className={styles.submitButton} disabled={!(dirty && isValid)}>
                Войти
              </button>
              <div className={styles.questionWithLink}>
                <p className={styles.question}>Ещё не зарегистрированы?</p>
                <Link to="/signup" className={styles.link}>Регистрация</Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
