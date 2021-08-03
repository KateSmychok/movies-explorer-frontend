import React from 'react';
import styles from './SearchForm.module.scss';
import cn from 'classnames/bind';

let cx = cn.bind(styles);

function SearchForm() {
  const [isTumblerOn, setIsTumblerOn] = React.useState(true);

  let tumblerClassName = cx({
    baseTumbler: true,
    tumblerOn: isTumblerOn,
    tumblerOff: !isTumblerOn,
  });

  const handleTumblerClick = () => {
    setIsTumblerOn(!isTumblerOn);
  }

  return (
    <section className={styles.searchSection}>
      <div className={styles.wholeForm}>
        <form className={styles.searchForm}>
          <input className={styles.searchInput}/>
          <button className={styles.searchButton}></button>
        </form>
        <div className={styles.shortFilmsTumbler}>
          <div className={styles.border}></div>
          <button
            className={tumblerClassName}
            onClick={handleTumblerClick}>
          </button>
          <p className={styles.caption}>Короткометражки</p>
        </div>
      </div>
    </section>
  )
}

export default SearchForm;
