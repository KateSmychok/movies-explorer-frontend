import React from 'react';
import cn from 'classnames';
import styles from './SavedMoviesCard.module.scss';
import { MinToHours } from '../../../utils/constants';

function SavedMoviesCard(props) {
  const handleDeleteMovieClick = () => {
    props.onMovieDelete(props.card._id);
  };

  return (
    <article className={styles.card}>
      <div className={styles.info}>
        <h2 className={styles.title}>
          {props.card.nameRU}
        </h2>
        <p className={styles.duration}>
          {MinToHours(props.card.duration)}
        </p>
      </div>
      <a className={styles.link} href={props.card.trailerLink} target='_blank'>
        <img className={styles.image} src={props.card.image} alt='Превью' />
      </a>
      <div className={styles.deleteFromSavedButtonArea}>
        <button
          className={styles.deleteFromSavedButton}
          onClick={handleDeleteMovieClick}>
        </button>
      </div>
    </article>
  );
}

export default SavedMoviesCard;
