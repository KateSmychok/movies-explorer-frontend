import React from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames/bind';
import styles from './MoviesCard.module.scss';

const cx = cn.bind(styles);

function MoviesCard(props) {
  const [movieIsSaved, setMovieIsSaved] = React.useState(false);

  const location = useLocation();

  const buttonText = movieIsSaved || location.pathname === '/saved-movies' ? '' : 'Сохранить';
  const buttonClassName = cx({
    baseButton: true,
    isNotSaved: !movieIsSaved,
    isSaved: movieIsSaved,
    removeFromSaved: location.pathname === '/saved-movies',
  });

  const handleSaveMovieClick = () => {
    setMovieIsSaved(!movieIsSaved);
  };

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
          onClick={handleSaveMovieClick}>
          {buttonText}
        </button>
      </div>
    </article>
  );
}

export default MoviesCard;
