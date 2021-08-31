import React from 'react';
import cn from 'classnames/bind';
import styles from './MoviesCard.module.scss';
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
    props.onSaveMovieClick({
      nameRU: props.card.nameRU,
      image: `https://api.nomoreparties.co${props.card.image.url}`,
      trailerLink: props.card.trailerLink,
      duration: props.card.duration,
    });
  }

  React.useEffect(() => {
    if (props.savedMovies.some((i) => i.nameRU === props.card.nameRU)) {
      setMovieIsSaved(true);
    }
  }, []);

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
        <img className={styles.image} src={`https://api.nomoreparties.co${props.card.image.url}`} alt='Превью' />
      </a>
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
