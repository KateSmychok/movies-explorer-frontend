import React from 'react';
import styles from './Techs.module.scss';

function Techs() {
  return (
    <section id='techs' className={styles.techs}>
      <div className={styles.techsContent}>
        <h2 className={styles.sectionTitle}>
          Технологии
        </h2>
        <h3 className={styles.mainTitle}>
          7 технологий
        </h3>
        <p className={styles.text}>
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className={styles.techsList}>
          <li className={styles.techsItem}>
            HTML
          </li>
          <li className={styles.techsItem}>
            CSS
          </li>
          <li className={styles.techsItem}>
            JS
          </li>
          <li className={styles.techsItem}>
            React
          </li>
          <li className={styles.techsItem}>
            Git
          </li>
          <li className={styles.techsItem}>
            Express.js
          </li>
          <li className={styles.techsItem}>
            MongoDB
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Techs;
