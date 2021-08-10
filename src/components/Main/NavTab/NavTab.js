import React from 'react';
import styles from './NavTab.module.scss';

function NavTab() {
  return (
    <section className={styles.navArea}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a className={styles.link} href='#project'>О проекте</a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.link} href='#techs'>Технологии</a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.link} href='#student'>Студент</a>
        </li>
      </ul>
    </section>
  );
}

export default NavTab;
