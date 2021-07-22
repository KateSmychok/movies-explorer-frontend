import React from 'react';
import cn from 'classnames';
import TechsStyles from './Techs.module.scss';

function Techs() {
  return (
    <section className={TechsStyles.techs}>
      <h2 className={TechsStyles.sectionTitle}>
        Технологии
      </h2>
      <h2 className={TechsStyles.mainTitle}>
        7 технологий
      </h2>
      <p className={TechsStyles.text}>
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>
      <ul className={TechsStyles.techsList}>
        <li className={TechsStyles.techsItem}>
          HTML
        </li>
        <li className={TechsStyles.techsItem}>
          CSS
        </li>
        <li className={TechsStyles.techsItem}>
          JS
        </li>
        <li className={TechsStyles.techsItem}>
          React
        </li>
        <li className={TechsStyles.techsItem}>
          Git
        </li>
        <li className={TechsStyles.techsItem}>
          Express.js
        </li>
        <li className={TechsStyles.techsItem}>
          MongoDB
        </li>
      </ul>
    </section>
  )
}

export default Techs;
