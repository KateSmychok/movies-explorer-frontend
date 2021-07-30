import React from 'react';
import styles from './Portfolio.module.scss';


function Portfolio() {
  return (
    <section className={styles.portfolio}>
      <h3 className={styles.title}>
        Портфолио
      </h3>
      <ul className={styles.linksList}>
        <li className={styles.linksItem}>
          <a className={styles.ref} href='https://even-star.students.nomoredomains.monster' target='_blank'>
            <p className={styles.project}>SPA приложение Mesto</p>
            <div className={styles.arrow}></div>
          </a>
        </li>
        <li className={styles.linksItem}>
          <a className={styles.ref} href='https://katesmychok.github.io/russian-travel' target='_blank'>
            <p className={styles.project}>Адаптивный сайт "Путешествия по России"</p>
            <div className={styles.arrow}></div>
          </a>
        </li>
        <li className={styles.linksItem}>
          <a className={styles.ref} href='https://katesmychok.github.io/how-to-learn' target='_blank'>
            <p className={styles.project}>Адаптивный сайт "Научиться учиться"</p>
            <div className={styles.arrow}></div>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
