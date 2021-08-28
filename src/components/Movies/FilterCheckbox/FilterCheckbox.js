import React from 'react';
import styles from './FilterCheckbox.module.scss';

function FilterCheckbox(props) {
  return (
    <form className={styles.filterCheckbox}>
      <input
        type='checkbox'
        defaultChecked={props.checked}
        onChange={props.onCheckboxClick}
        id='shortFilms'
        className={styles.hiddenCheckbox}
      >
      </input>
      <label htmlFor='shortFilms' className={styles.label}>Короткометражки</label>
    </form>
  );
}

export default FilterCheckbox;
