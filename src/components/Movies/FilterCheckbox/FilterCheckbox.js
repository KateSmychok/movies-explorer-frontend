import React from 'react';
import styles from './FilterCheckbox.module.scss';

function FilterCheckbox() {
  const [checked, setChecked] = React.useState(true);

  return (
    <form className={styles.filterCheckbox}>
      <input
        type='checkbox'
        defaultChecked={checked}
        id='shortFilms'
        className={styles.hiddenCheckbox}>
      </input>
      <label for='shortFilms' className={styles.label}>Короткометражки</label>
    </form>
  );
}

export default FilterCheckbox;
