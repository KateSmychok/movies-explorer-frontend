import React from 'react';
import cn from 'classnames';
import styles from './SavedMoviesCard.module.scss';
import api from '../../../utils/MainApi';

function MoviesCard(props) {
  const minToHours = (min) => {
    const hours = Math.trunc(min / 60);
    const minutes = min % 60;
    if (min < 60) {
      return `${min} мин.`;
    }
    return `${hours} ч. ${minutes} мин.`;
  };

  const handleDeleteMovieClick = () => {
    api.deleteMovieFromSaved(props.card._id)
      .then((card) => {
        console.log(card);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <article className={styles.card}>
      <div className={styles.info}>
        <h2 className={styles.title}>
          {props.card.nameRU}
        </h2>
        <p className={styles.duration}>
          {minToHours(props.card.duration)}
        </p>
      </div>
      <img className={styles.image} src={props.card.image} alt='Превью' />
      <div className={styles.saveButtonArea}>
        <button
          className={cn(styles.baseButton, styles.removeFromSaved)}
          onClick={handleDeleteMovieClick}>
        </button>
      </div>
    </article>
  );
}

export default MoviesCard;
