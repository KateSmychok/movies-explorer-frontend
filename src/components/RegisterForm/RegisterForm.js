import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames/bind';
import styles from './RegisterForm.module.scss';

const cx = cn.bind(styles);

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Минимальная длина - 2 символа')
    .max(30, 'Максимальная длина - 30 символов')
    .required('Поле обязательно должно быть заполнено')
    .matches(/^[а-яА-ЯёЁa-zA-Z0-9_-]+$/,
      'Допустимые символы: буквы, цифры, дефис, нижнее подчёркивание'),
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

function RegisterForm() {
  const history = useHistory();

  return (
  <div>
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}

      validationSchema={RegisterSchema}

      onSubmit={ (values) => {
        console.log(values);
        history.push('/signin');
      }}
    >
      {({
        errors,
        touched,
        dirty,
        isValid,
      }) => (
        <Form className={styles.form}>
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

export default RegisterForm;
