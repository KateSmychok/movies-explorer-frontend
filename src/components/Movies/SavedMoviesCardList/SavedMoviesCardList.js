import React from 'react';
import styles from './SavedMoviesCardList.module.scss';
import MoviesCard from '../MoviesCard/MoviesCard';
import cardSamples from '../../../utils/constants';

function SavedMoviesCardList() {
  const cards = cardSamples.map((card) => {
    return <MoviesCard card={card} key={card._id} />
  })

  return (
    <section className={styles.cardListSection}>
      <ul className={styles.cardList}>
        {cards}
      </ul>
    </section>
  )
}

export default SavedMoviesCardList;
