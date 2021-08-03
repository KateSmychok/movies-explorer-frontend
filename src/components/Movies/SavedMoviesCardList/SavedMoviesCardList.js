import React from 'react';
import styles from './SavedMoviesCardList.module.scss';
import MoviesCard from '../MoviesCard/MoviesCard';
import api from '../../../utils/api';

function SavedMoviesCardList() {
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    api.getSavedMovies()
      .then((data) => {
        setMovies(data.data)
      })
  }, [])

  return (
    <section className={styles.cardListSection}>
      <ul className={styles.cardList}>
        {movies.map((card) => {
            return <MoviesCard card={card} key={card._id} />
        })}
      </ul>
    </section>
  )
}

export default SavedMoviesCardList;
