import React from 'react';
import FooterStyles from './Footer.module.scss';

function Footer() {
  return (
    <section className={FooterStyles.footer}>
      <h3 className={FooterStyles.caption}>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className={FooterStyles.info}>
        <p className={FooterStyles.copyright}>
          &#169; 2021. Kate Smychok
        </p>
        <nav>
          <ul className={FooterStyles.navList}>
            <li className={FooterStyles.navItem}>
              <a className={FooterStyles.link} href='https://praktikum.yandex.ru' target='_blank'>Яндекс.Практикум</a>
            </li>
            <li className={FooterStyles.navItem}>
              <a className={FooterStyles.link} href='https://github.com/KateSmychok' target='_blank'>Github</a>
            </li>
            <li className={FooterStyles.navItem}>
              <a className={FooterStyles.link} href='https://t.me/even_starr' target='_blank'>Telegram</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  )
}

export default Footer;
