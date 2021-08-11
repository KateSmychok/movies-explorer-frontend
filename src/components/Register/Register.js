import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames/bind';
import styles from './Register.module.scss';
import api from '../../utils/MainApi';
import InfoToolTip from '../InfoToolTip/InfoTooltip';
import { RegisterSchema } from '../../utils/constants';

const cx = cn.bind(styles);

function Register(props) {
  const [isInfoToolTipOpened, setIsInfoToolTipOpened] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(true);
  const history = useHistory();

  const closeInfoToolTip = () => {
    setIsInfoToolTipOpened(false);
    if (isSuccess) {
      history.push('/movies');
    }
  };

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
        api.register(
          values.name,
          values.email,
          values.password,
        )
          .then((data) => {
            if (data) {
              setIsSuccess(true);
              setIsInfoToolTipOpened(true);
            } else {
              setIsSuccess(false);
              setIsInfoToolTipOpened(true);
            }
            return data;
          })
          .then((data) => {
            props.onSubmit({
              email: data.email,
              password: data.password,
            });
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
    <InfoToolTip
      isOpened={isInfoToolTipOpened}
      isSuccess={isSuccess}
      onClose={closeInfoToolTip} />
  </div>
  );
}

export default Register;
