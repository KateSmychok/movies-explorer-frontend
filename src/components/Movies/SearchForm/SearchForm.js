import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from './SearchForm.module.scss';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchSchema = Yup.object().shape({
  keyword: Yup.string()
    .min(2, 'Минимальная длина - 2 символа')
    .max(40, 'Максимальная длина запроса - 40 символов')
    .required('Нужно ввести ключевое слово для поиска'),
});

function SearchForm() {
  return (
    <div>
      <Formik
        initialValues={{
          keyword: '',
        }}

        validationSchema={SearchSchema}

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
          <section className={styles.searchSection}>
            <div className={styles.formWithTumbler}>
              <Form className={styles.form}>
                <Field
                  name='keyword'
                  type='text'
                  className={styles.input}
                  id='keyword'
                  placeholder='Фильм'
                />
                {errors.keyword && touched.keyword ? (
                  <span className={styles.inputError}>
                    {errors.keyword}</span>
                ) : <span className={styles.inputError}> </span>
                }

                <button type='submit' className={styles.submitButton} disabled={!(dirty && isValid)}> </button>
              </Form>
              <div className={styles.border}> </div>
              <FilterCheckbox />
            </div>
          </section>
        )}
      </Formik>
    </div>
  );
}

export default SearchForm;
