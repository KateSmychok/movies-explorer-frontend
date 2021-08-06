import React from 'react';
import styles from './SearchForm.module.scss';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {

  return (
    <section className={styles.searchSection}>
      <div className={styles.wholeForm}>
        <form className={styles.searchForm}>
          <input className={styles.searchInput}/>
          <button className={styles.searchButton}> </button>
        </form>
        <div className={styles.border}> </div>
        <FilterCheckbox />
      </div>
    </section>
  )
}

export default SearchForm;
