import React from 'react';
import NavTabStyles from './NavTab.module.scss';

function NavTab() {
  return (
    <div className={NavTabStyles.navArea}>
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
    </div>
  )
}

export default NavTab;
