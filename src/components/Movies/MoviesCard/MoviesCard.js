import React from 'react';
import cn from 'classnames/bind';
import styles from './MoviesCard.module.scss';
import api from '../../../utils/MainApi';
import { MinToHours } from '../../../utils/constants';

const cx = cn.bind(styles);

function MoviesCard(props) {
  const [movieIsSaved, setMovieIsSaved] = React.useState(false);

  const buttonText = movieIsSaved ? '' : 'Сохранить';

  const buttonClassName = cx({
    baseButton: true,
    isNotSaved: !movieIsSaved,
    isSaved: movieIsSaved,
  });

  function handleSaveMovieClick() {
    setMovieIsSaved(!movieIsSaved);
    api.saveMovie(
      props.card.nameRU,
      `https://api.nomoreparties.co${props.card.image.url}`,
      props.card.trailerLink,
      props.card.duration,
    )
      .then((movie) => {
        console.log(movie);
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
          {MinToHours(props.card.duration)}
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
