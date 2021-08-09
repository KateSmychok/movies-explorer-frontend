import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';
import styles from './LoginForm.module.scss';

const cx = cn.bind(styles);

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Невалидный email')
    .min(6, 'Минимальная длина - 6 символов')
    .max(40, 'Максимальная длина - 40 символов')
    .required('Поле обязательно должно быть заполнено'),
  password: Yup.string()
    .min(6, 'Минимальная длина - 6 символов')
    .max(15, 'Максимальная длина - 15 символов')
    .required('Поле обязательно должно быть заполнено'),
});

function LoginForm() {
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}

        validationSchema={LoginSchema}

        onSubmit={ (values) => {
          console.log(values);
        }}
      >
        {({
          errors,
          touched,
          dirty,
          isValid,
        }) => (
          <Form className={styles.form}>
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

export default LoginForm;
