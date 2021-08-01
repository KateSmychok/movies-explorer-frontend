import React from 'react';
import styles from './MoviesCard.module.scss';
import cn from 'classnames';

function MoviesCard(props) {
  const [movieIsSaved, setMovieIsSaved] = React.useState(false);

  const handleSaveMovieClick = () => {
    setMovieIsSaved(!movieIsSaved);
  }

  return (
    <article className={styles.card}>
      <div className={styles.info}>
        <h2 className={styles.title}>
          {props.title}
        </h2>
        <p className={styles.duration}>
          {props.duration}
        </p>
      </div>
      <img className={styles.image} src={props.image} alt='Превью' />
      <div className={styles.likeButtonArea}>
        <button
          className={cn(styles.button, ${movieIsSaved ? styles.deleteFromSavedButton : styles.saveButton})}
          onClick={handleSaveMovieClick}>
        </button>
      </div>
    </article>
  )
}

export default MoviesCard;
