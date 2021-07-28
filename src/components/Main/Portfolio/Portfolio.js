import React from 'react';
import PortfolioStyles from './Portfolio.module.scss';


function Portfolio() {
  return (
    <section className={PortfolioStyles.portfolio}>
      <h3 className={PortfolioStyles.title}>
        Портфолио
      </h3>
      <ul className={PortfolioStyles.linksList}>
        <li className={PortfolioStyles.linksItem}>
          <a className={PortfolioStyles.ref} href='https://even-star.students.nomoredomains.monster' target='_blank'>
            <p className={PortfolioStyles.project}>SPA приложение Mesto</p>
            <div className={PortfolioStyles.arrow}></div>
          </a>
        </li>
        <li className={PortfolioStyles.linksItem}>
          <a className={PortfolioStyles.ref} href='https://katesmychok.github.io/russian-travel' target='_blank'>
            <p className={PortfolioStyles.project}>Адаптивный сайт "Путешествия по России"</p>
            <div className={PortfolioStyles.arrow}></div>
          </a>
        </li>
        <li className={PortfolioStyles.linksItem}>
          <a className={PortfolioStyles.ref} href='https://katesmychok.github.io/how-to-learn' target='_blank'>
            <p className={PortfolioStyles.project}>Адаптивный сайт "Научиться учиться"</p>
            <div className={PortfolioStyles.arrow}></div>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
