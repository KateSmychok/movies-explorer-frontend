import React from 'react';
import TechsStyles from './Techs.module.scss';

function Techs() {
  return (
    <section className={TechsStyles.techs}>
      <div className={TechsStyles.techsContent}>
        <h2 className={TechsStyles.sectionTitle}>
          Технологии
        </h2>
        <h3 className={TechsStyles.mainTitle}>
          7 технологий
        </h3>
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
      </div>
    </section>
  )
}

export default Techs;
