import React from 'react';
import cn from 'classnames/bind';
import MoviesCard from '../MoviesCard/MoviesCard';
import styles from './MoviesCardList.module.scss';
import getMovies from '../../../utils/MoviesApi';
import SearchForm from '../SearchForm/SearchForm';

const cx = cn.bind(styles);

function MoviesCardList(props) {
  const [hasResult, setHasResult] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);

  function handleStartSearch({ keyword }) {
    getMovies()
      .then((allMovies) => {
        setFilteredMovies(
          allMovies.filter((item) => item.nameRU
            .toLowerCase()
            .indexOf(keyword.toLowerCase()) > -1),
        );
        console.log(filteredMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className={styles.cardListSection}>
      <SearchForm onStartSearch={handleStartSearch} />
      <ul className={styles.cardList}>
        {filteredMovies.map((card) => <MoviesCard card={card} key={card.id} />)}
      </ul>
      <div className={styles.loadMoreSection}>
        <button type='button' className={styles.loadMoreButton}>
          Ещё
        </button>
      </div>
    </section>
  );
}

export default MoviesCardList;
