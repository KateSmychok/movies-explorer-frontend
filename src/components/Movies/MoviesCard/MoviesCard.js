import React from 'react';
import styles from './MoviesCard.module.scss';
import cn from 'classnames/bind';

let cx = cn.bind(styles);

function MoviesCard(props) {
  const [movieIsSaved, setMovieIsSaved] = React.useState(false);

  let buttonText = movieIsSaved ? '' : 'Сохранить';
  let buttonClassName = cx({
    baseButton: true,
    isNotSaved: !movieIsSaved,
    isSaved: movieIsSaved,
  });

  const handleSaveMovieClick = () => {
    setMovieIsSaved(!movieIsSaved);
  }

  return (
    <article className={styles.card}>
      <div className={styles.info}>
        <h2 className={styles.title}>
          {props.card.title}
        </h2>
        <p className={styles.duration}>
          {props.card.duration}
        </p>
      </div>
      <img className={styles.image} src={props.card.image} alt='Превью' />
      <div className={styles.saveButtonArea}>
        <button
          className={buttonClassName}
          onClick={handleSaveMovieClick}>
          {buttonText}
        </button>
      </div>
    </article>
  )
}

export default MoviesCard;
