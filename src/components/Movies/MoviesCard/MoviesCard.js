import React from 'react';
import cn from 'classnames/bind';
import styles from './MoviesCard.module.scss';
import api from '../../../utils/MainApi';

const cx = cn.bind(styles);

function MoviesCard(props) {
  const buttonText = props.movieIsSaved ? '' : 'Сохранить';
  const buttonClassName = cx({
    baseButton: true,
    isNotSaved: !props.movieIsSaved,
    isSaved: props.movieIsSaved,
  });

  const minToHours = (min) => {
    const hours = Math.trunc(min / 60);
    const minutes = min % 60;
    if (min < 60) {
      return `${min} мин.`;
    }
    return `${hours} ч. ${minutes} мин.`;
  };

  function handleSaveMovieClick(e) {
    api.saveMovie(
      props.card.nameRU,
      `https://api.nomoreparties.co${props.card.image.url}`,
      props.card.trailerLink,
      props.card.duration,
    )
      .then((movie) => {
        console.log(movie);
        console.log(e.currentTarget);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

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
      <img className={styles.image} src={`https://api.nomoreparties.co${props.card.image.url}`} alt='Превью' />
      <div className={styles.saveButtonArea}>
        <button
          className={buttonClassName}
          onClick={handleSaveMovieClick}>
          {buttonText}
        </button>
      </div>
    </article>
  );
}

export default MoviesCard;
