import React from 'react';
import { Formik, Form, Field } from 'formik';
import styles from './SearchForm.module.scss';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { SearchSchema } from '../../../utils/constants';

function SearchForm(props) {
  return (
    <div>
      <Formik
        initialValues={{
          keyword: '',
        }}

        validationSchema={SearchSchema}

        onSubmit={ (values) => {
          props.onStartSearch({
            keyword: values.keyword,
          });
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
                  autoComplete='off'
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
