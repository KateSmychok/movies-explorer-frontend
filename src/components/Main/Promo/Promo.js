import React from 'react';
import styles from './Promo.module.scss';

function Promo() {
  return (
    <section className={styles.promo}>
      <div className={styles.background}>
        <h1 className={styles.mainTitle}>
          Учебный проект студента факультета Веб-разработки
        </h1>
      </div>
    </section>
  )
}

export default Promo;
