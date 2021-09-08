import React from 'react';
import { Field, Form, Formik } from 'formik';
import cn from 'classnames';
import styles from './Profile.module.scss';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { ProfileSchema } from '../../utils/validationSchemas';

function Profile(props) {
  const user = React.useContext(CurrentUserContext);

  return (
    <section className={styles.profileSection}>
      <Formik
        initialValues={{
          name: user.name,
          email: user.email,
        }}

        validationSchema={ProfileSchema}

        onSubmit={ (values) => {
          props.onSubmit({
            name: values.name,
            email: values.email,
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          dirty,
          isValid,
        }) => (
          <Form className={styles.form}>
            <h2 className={styles.greeting}>
              Привет, {user.name}!
            </h2>

            <div className={styles.inputWithLabel}>
              <label className={styles.label} htmlFor='name'>Имя</label>
              <Field
                name='name'
                type='text'
                className={styles.input}
                id='name-profile'
                autoComplete='off'
              />
            </div>
            {errors.name && touched.name ? (
              <span className={cn(styles.inputError, styles.inputErrorProfile)}>
                {errors.name}
              </span>)
              : <span className={styles.inputError}> </span>
            }

            <div className={styles.border}> </div>

            <div className={styles.inputWithLabel}>
              <label className={styles.label} htmlFor='email'>E-mail</label>
              <Field
                name='email'
                type='email'
                className={styles.input}
                id='email-profile'
                autoComplete='off'
              />
            </div>
            { errors.email && touched.email ? (
              <span className={cn(styles.inputError, styles.inputErrorProfile)}>
                {errors.email}
              </span>)
              : <span className={styles.inputError}> </span>
            }

            { values.name === user.name && values.email === user.email ? (
              <span className={cn(styles.inputError, styles.inputErrorProfile)}>
                {'Измените имя или e-mail для редактирования профиля'}
              </span>)
              : <span className={styles.inputError}> </span>
            }

            <div className={styles.buttons}>
              <button
                type='submit'
                className={cn(styles.button, styles.buttonEdit)}
                disabled={!(dirty && isValid)
                || (values.name === user.name && values.email === user.email)}
              >
                Редактировать
              </button>
              <button
                type='button'
                className={cn(styles.button, styles.buttonSignOut)}
                onClick={props.onSignOut}>
                Выйти из аккаунта
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default Profile;
