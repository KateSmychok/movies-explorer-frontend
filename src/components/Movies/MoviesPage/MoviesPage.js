import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { SetMaximumCards, AddCardsOnBtnClick } from '../../../utils/constants';
import getAllMovies from '../../../utils/MoviesApi';

function MoviesPage(props) {
  const [maxCards, setMaxCards] = React.useState(SetMaximumCards());
  const [hasResult, setHasResult] = React.useState(false);
  const [triedToSearch, setTriedToSearch] = React.useState(false);

  const [allMovies, setAllMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [moviesToRender, setMoviesToRender] = React.useState([]);

  const [btnLoadMoreIsVisible, setBtnLoadMoreIsVisible] = React.useState(false);
  const [preloaderIsVisible, setPreloaderIsVisible] = React.useState(false);
  const [messageIsVisible, setMessageIsVisible] = React.useState(false);

  // Получить все фильмы из БД
  React.useEffect(() => {
    getAllMovies()
      .then((items) => {
        setAllMovies(items);
      })
      .catch(() => {
        props.setErrMessage(
          'Во время запроса произошла ошибка. '
          + 'Возможно, проблема с соединением или сервер недоступен. '
          + 'Подождите немного и попробуйте ещё раз',
        );
      });
  }, []);

  const setDefaultStates = () => {
    setBtnLoadMoreIsVisible(false);
    setHasResult(false);
    setMaxCards(SetMaximumCards());
    setMoviesToRender([]);
  };

  // Сабмит формы поиска
  const handleSearchBtnSubmit = ({ keyword }) => {
    localStorage.removeItem('movies');
    setDefaultStates();
    setPreloaderIsVisible(true);

    const movies = allMovies.filter(
      (item) => item.nameRU.toLowerCase().indexOf(keyword.toLowerCase()) > -1,
    );
    setTriedToSearch(true);
    if (movies.length > 0) {
      setFilteredMovies(movies);
      localStorage.setItem('movies', JSON.stringify(movies));
    } else {
      console.log('test1');
      setPreloaderIsVisible(false);
      setMessageIsVisible(true);
      props.setErrMessage('Ничего не найдено');
    }
  };

  // Рендер фильмов
  React.useEffect(() => {
    console.log('test2');
    if (localStorage.getItem('movies')) {
      const moviesInLocalStorage = JSON.parse(localStorage.getItem('movies'));
      const movies = [];
      for (let i = 0; i < maxCards && i < moviesInLocalStorage.length; i += 1) {
        movies.push(moviesInLocalStorage[i]);
      }
      setMoviesToRender(movies);
      setMessageIsVisible(false);
      setTimeout(
        () => {
          setPreloaderIsVisible(false);
          setHasResult(true);
          if (moviesInLocalStorage.length > maxCards) {
            setBtnLoadMoreIsVisible(true);
          } else {
            setBtnLoadMoreIsVisible(false);
          }
        }, 500,
      );
    } else {
      setDefaultStates();
      setPreloaderIsVisible(false);
    }
  }, [filteredMovies, maxCards]);

  // Клик на кнопку "Еще"
  const handleLoadMoreBtnClick = () => {
    setMaxCards(maxCards + AddCardsOnBtnClick());
  };

  return (
    <>
      <SearchForm onSubmit={handleSearchBtnSubmit} />
      <MoviesCardList
        moviesToRender={moviesToRender}
        btnLoadMoreIsVisible={btnLoadMoreIsVisible}
        onLoadMoreBtnClick={handleLoadMoreBtnClick}
        hasResult={hasResult}
        preloaderIsVisible={preloaderIsVisible}
        messageIsVisible={messageIsVisible}
        errMessage={props.errMessage}
        setErrMessage={props.setErrMessage}
      />
    </>
  );
}

export default MoviesPage;
