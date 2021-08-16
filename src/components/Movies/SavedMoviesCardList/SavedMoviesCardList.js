import React from 'react';
import styles from './SavedMoviesCardList.module.scss';
import SavedMoviesCard from '../SavedMoviesCard/SavedMoviesCard';
import api from '../../../utils/MainApi';

function SavedMoviesCardList(props) {
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    api.getSavedMovies()
      .then((savedMovies) => {
        setMovies(savedMovies);
      });
  }, []);

  return (
    <section className={styles.cardListSection}>
      <ul className={styles.cardList}>
        {movies.map((card) => <SavedMoviesCard
            card={card}
            key={card._id}
        />)}
      </ul>
    </section>
  );
}

export default SavedMoviesCardList;
