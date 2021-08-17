import React from 'react';
import styles from './SavedMoviesCardList.module.scss';
import SavedMoviesCard from '../SavedMoviesCard/SavedMoviesCard';

function SavedMoviesCardList(props) {
  return (
    <section className={styles.cardListSection}>
      <ul className={styles.cardList}>
        {props.savedMovies.map((card) => <SavedMoviesCard
            card={card}
            key={card._id}
            onMovieDelete = {props.onMovieDelete}
        />)}
      </ul>
    </section>
  );
}

export default SavedMoviesCardList;
