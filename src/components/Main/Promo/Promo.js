import React from 'react';
import PromoStyles from './Promo.module.scss';

function Promo() {
  return (
    <section className={PromoStyles.banner}>
      <h1 className={PromoStyles.mainTitle}>
        Учебный проект студента факультета Веб-разработки
      </h1>
    </section>
  )
}

export default Promo;
