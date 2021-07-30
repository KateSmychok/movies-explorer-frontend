import React from 'react';
import NavTabStyles from './NavTab.module.scss';

function NavTab() {
  return (
    <section className={NavTabStyles.navArea}>
      <ul className={NavTabStyles.navList}>
        <li className={NavTabStyles.navItem}>
          <a className={NavTabStyles.link} href='#project'>О проекте</a>
        </li>
        <li className={NavTabStyles.navItem}>
          <a className={NavTabStyles.link} href='#techs'>Технологии</a>
        </li>
        <li className={NavTabStyles.navItem}>
          <a className={NavTabStyles.link} href='#student'>Студент</a>
        </li>
      </ul>
    </section>
  )
}

export default NavTab;
