import React from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames/bind';
import styles from './MoviesCard.module.scss';
import api from '../../../utils/MainApi';

const cx = cn.bind(styles);

function MoviesCard(props) {
  const [movieIsSaved, setMovieIsSaved] = React.useState(false);
  const [saveMovies, setSavedMovies] = React.useState([]);

  const location = useLocation();

  const buttonText = movieIsSaved || location.pathname === '/saved-movies' ? '' : 'Сохранить';
  const buttonClassName = cx({
    baseButton: true,
    isNotSaved: !movieIsSaved,
    isSaved: movieIsSaved,
  });

  function handleSaveMovieClick() {
    api.saveMovie(
      props.card.nameRU,
      `https://api.nomoreparties.co${props.card.image.url}`,
      props.card.trailerLink,
      props.card.duration,
    )
      .then((movies) => {
        setSavedMovies(movies);
        localStorage.setItem('saved-movies', JSON.stringify(movies));
        console.log(movies);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setMovieIsSaved(!movieIsSaved);
  }

  const minToHours = (min) => {
    const hours = Math.trunc(min / 60);
    const minutes = min % 60;
    if (min < 60) {
      return `${min} мин.`;
    }
    return `${hours} ч. ${minutes} мин.`;
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
      <img className={styles.image} src={`https://api.nomoreparties.co${props.card.image.url}`} alt='Превью' />
      <div className={styles.saveButtonArea}>
        <button
          className={buttonClassName}
          onClick={() => {
            handleSaveMovieClick();
          }}>
          {buttonText}
        </button>
      </div>
    </article>
  );
}

export default MoviesCard;
