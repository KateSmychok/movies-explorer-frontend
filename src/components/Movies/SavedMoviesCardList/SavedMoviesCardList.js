import React from 'react';
import styles from './SavedMoviesCardList.module.scss';
import SavedMoviesCard from '../SavedMoviesCard/SavedMoviesCard';

function SavedMoviesCardList(props) {
  return (
    <section className={styles.cardListSection}>
      {props.errMessageIsVisible && <p className={styles.errText}>{props.errMessage}</p>}
      <ul className={styles.cardList}>
        {props.moviesToRender.map((card) => <SavedMoviesCard
            card={card}
            key={card._id}
            onMovieDelete={props.onMovieDelete}
        />)}
      </ul>
    </section>
  );
}

export default SavedMoviesCardList;
