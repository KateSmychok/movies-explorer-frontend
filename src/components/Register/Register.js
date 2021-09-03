import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames/bind';
import styles from './Register.module.scss';
import { RegisterSchema } from '../../utils/validationSchemas';

const cx = cn.bind(styles);

function Register(props) {
  return (
  <div className={styles.registerPage}>
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}

      validationSchema={RegisterSchema}

      onSubmit={ (values) => {
        props.onSubmit({
          name: values.name,
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
          <h2 className={styles.greeting}>Добро пожаловать!</h2>
          <label className={styles.label} htmlFor='name'>Имя</label>
          <Field
            name='name'
            type='text'
            className={cx({
              baseInput: true,
              inputValid: !errors.name && touched.name,
              inputInvalid: errors.name && touched.name,
            })}
            id='name-register'
            autoComplete='off'
          />
          {errors.name && touched.name ? (
            <span className={styles.inputError}>{errors.name}</span>
          ) : <span className={styles.inputError}> </span>
          }

          <label className={styles.label} htmlFor='email'>E-mail</label>
          <Field
            name='email'
            type='email'
            className={cx({
              baseInput: true,
              inputValid: !errors.email && touched.email,
              inputInvalid: errors.email && touched.email,
            })}
            id='email-register'
            autoComplete='off'
          />
          {errors.email && touched.email ? (
            <span className={styles.inputError}>{errors.email}</span>
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
            id='password-register'
            autoComplete='off'
          />
          {errors.password && touched.password ? (
            <span className={styles.inputError}>{errors.password}</span>
          ) : <span className={styles.inputError}> </span>
          }

          <div className={styles.buttonWithCaption}>
            <button type='submit' className={styles.submitButton} disabled={!(dirty && isValid)}>
              Зарегистрироваться
            </button>
            <div className={styles.questionWithLink}>
              <p className={styles.question}>Уже зарегистрированы?</p>
              <Link to="/signin" className={styles.link}>Войти</Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  </div>
  );
}

export default Register;
