import React from 'react';
import styles from './SearchForm.module.scss'

function SearchForm() {
  return (
    <section className={styles.searchSection}>
      <div className={styles.wholeForm}>
        <form className={styles.searchForm}>
          <input className={styles.searchInput}/>
          <button className={styles.searchButton}></button>
        </form>
        <div className={styles.shortFilmsTumbler}>
          <div className={styles.border}></div>
          <button className={styles.tumblerOn}></button>
          <p className={styles.caption}>Короткометражки</p>
        </div>
      </div>
    </section>
  )
}

export default SearchForm;
