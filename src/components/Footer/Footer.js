import React from 'react';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <section className={styles.footer}>
      <h3 className={styles.caption}>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className={styles.info}>
        <p className={styles.copyright}>
          &#169; 2021 Kate Smychok
        </p>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a className={styles.link} href='https://praktikum.yandex.ru' target='_blank'>Яндекс.Практикум</a>
            </li>
            <li className={styles.navItem}>
              <a className={styles.link} href='https://github.com/KateSmychok' target='_blank'>Github</a>
            </li>
            <li className={styles.navItem}>
              <a className={styles.link} href='https://t.me/even_starr' target='_blank'>Telegram</a>
            </li>
          </ul>
        </nav>
      </div>
      <p className={styles.copyrightMobile}>
        &#169; 2021 Kate Smychok
      </p>
    </section>
  );
}

export default Footer;
