import React from 'react';
import styles from './MoviesCardList.module.scss';
import MoviesCard from '../MoviesCard/MoviesCard';
import cardSamples from '../../../utils/constants';

function MoviesCardList() {
  const cards = cardSamples.map((card) => {
    return <MoviesCard card={card} key={card._id} />
  })

  return (
    <section className={styles.cardListSection}>
      <ul className={styles.cardList}>
        {cards}
      </ul>
      <div className={styles.loadMoreSection}>
        <button className={styles.loadMoreButton}>
          Ещё
        </button>
      </div>
    </section>
  )
}

export default MoviesCardList;
