import React from 'react';
import PromoStyles from './Promo.module.scss';

function Promo() {
  return (
    <section className={PromoStyles.promo}>
      <div className={PromoStyles.background}>
        <h1 className={PromoStyles.mainTitle}>
          Учебный проект студента факультета Веб-разработки
        </h1>
      </div>
    </section>
  )
}

export default Promo;
