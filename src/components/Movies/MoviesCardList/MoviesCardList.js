import React from 'react';
import styles from './MoviesCardList.module.scss';
import MoviesCard from '../MoviesCard/MoviesCard';
import api from '../../../utils/api';

function MoviesCardList() {
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    api.getMovies()
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
      <div className={styles.loadMoreSection}>
        <button className={styles.loadMoreButton}>
          Ещё
        </button>
      </div>
    </section>
  )
}

export default MoviesCardList;
