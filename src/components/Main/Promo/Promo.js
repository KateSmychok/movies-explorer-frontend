import React from 'react';
import PromoStyles from './Promo.module.scss';

function Promo() {
  return (
    <section className={PromoStyles.banner}>
      <p className={PromoStyles.title}>
        Учебный проект студента факультета Веб-разработки
      </p>
    </section>
  )
}

export default Promo;
