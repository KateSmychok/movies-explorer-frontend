import React from 'react';
import NavTabStyles from './NavTab.module.scss';

function NavTab() {
  return (
    <section className={NavTabStyles.navArea}>
      <ul className={NavTabStyles.navList}>
        <li className={NavTabStyles.navItem}>
          О проекте
        </li>
        <li className={NavTabStyles.navItem}>
          Технологии
        </li>
        <li className={NavTabStyles.navItem}>
          Студент
        </li>
      </ul>
    </section>
  )
}

export default NavTab;
