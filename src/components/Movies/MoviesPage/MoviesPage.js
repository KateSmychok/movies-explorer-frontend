import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { SetMaximumCards, AddCardsOnBtnClick } from '../../../utils/commonFunctions';
import getAllMovies from '../../../api/MoviesApi';

function MoviesPage(props) {
  const [maxCards, setMaxCards] = React.useState(SetMaximumCards());
  const [hasResult, setHasResult] = React.useState(false);

  const [allMovies, setAllMovies] = React.useState([]);
  const [longMovies, setLongMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [filteredLongMovies, setFilteredLongMovies] = React.useState([]);
  const [moviesToRender, setMoviesToRender] = React.useState([]);

  const [messageIsVisible, setMessageIsVisible] = React.useState(false);
  const [loadMoreIsVisible, setLoadMoreIsVisible] = React.useState(false);
  const [preloaderIsVisible, setPreloaderIsVisible] = React.useState(false);

  const [checked, setChecked] = React.useState(true);

  // Получить все фильмы из БД и сохранить в стейты
  React.useEffect(() => {
    getAllMovies()
      .then((movies) => {
        setAllMovies(movies);
        setLongMovies(movies.filter(
          (item) => item.duration > 40,
        ));
        setMessageIsVisible(false);
      })
      .catch(() => {
        setMessageIsVisible(true);
        props.setErrMessage(
          'Во время запроса произошла ошибка. '
          + 'Возможно, проблема с соединением или сервер недоступен. '
          + 'Подождите немного и попробуйте ещё раз',
        );
      });
  }, []);

  // Дефолтные стейты
  const setDefaultStates = () => {
    setLoadMoreIsVisible(false);
    setHasResult(false);
    setMaxCards(SetMaximumCards());
    setMoviesToRender([]);
    localStorage.removeItem('movies');
    localStorage.removeItem('long-movies');
  };

  // Если ничего не найдено
  const setNotFoundStates = () => {
    setMessageIsVisible(true);
    props.setErrMessage('Ничего не найдено');
  };

  // Получить и распарсить item из ЛС
  function getMoviesFromLS(itemName) {
    return (
      JSON.parse(localStorage.getItem(itemName))
    );
  }

  // Сабмит формы поиска
  const handleSearchBtnSubmit = ({ keyword }) => {
    setDefaultStates();
    setPreloaderIsVisible(true);
    setMessageIsVisible(false);

    const filMovies = allMovies.filter(
      (item) => item.nameRU.toLowerCase().indexOf(keyword.toLowerCase()) > -1,
    );

    const filLongMovies = longMovies.filter(
      (item) => item.nameRU.toLowerCase().indexOf(keyword.toLowerCase()) > -1,
    );

    if (filMovies.length > 0) {
      setFilteredMovies(filMovies);
      localStorage.setItem('movies', JSON.stringify(filMovies));
    }

    if (filLongMovies.length > 0) {
      setFilteredLongMovies(filLongMovies);
      localStorage.setItem('long-movies', JSON.stringify(filLongMovies));
    } else {
      setFilteredLongMovies([]);
      setNotFoundStates();
    }

    if (filMovies.length === 0 && filLongMovies.length === 0) {
      setFilteredMovies([]);
      setFilteredLongMovies([]);
      setTimeout(() => {
        setNotFoundStates();
        setDefaultStates();
        setPreloaderIsVisible(false);
      }, 300);
    }
  };

  // Получение нужного количества фильмов для рендера
  const getMoviesToRender = (films) => {
    const movies = [];
    for (let i = 0; i < maxCards && i < films.length; i += 1) {
      movies.push(films[i]);
    }
    setMoviesToRender(movies);
    setMessageIsVisible(false);
    setTimeout(() => {
      setHasResult(true);
      if (films.length > maxCards) {
        setLoadMoreIsVisible(true);
      } else {
        setLoadMoreIsVisible(false);
      }
    }, 300);
  };

  // Логика рендера фильмов
  const renderMovies = () => {
    // Чекбокс +
    if (checked) {
      setMessageIsVisible(false);
      if (filteredMovies.length > 0) {
        getMoviesToRender(filteredMovies);
      } else if (filteredMovies.length === 0 && localStorage.getItem('movies')) {
        getMoviesToRender(getMoviesFromLS('movies'));
      } else {
        setNotFoundStates();
        setHasResult(false);
        setMoviesToRender([]);
      }
      // Чекбокс -
    } else {
      if (filteredLongMovies.length > 0) {
        getMoviesToRender(filteredLongMovies);
      } else if (filteredLongMovies.length === 0 && localStorage.getItem('long-movies')) {
        getMoviesToRender(getMoviesFromLS('long-movies'));
      } else {
        setNotFoundStates();
        setHasResult(false);
        setMoviesToRender([]);
      }
    }
    setPreloaderIsVisible(false);
  };

  // Ререндер фильмов при изменении ключевого слова, количества карточек, переключении тумблера
  React.useEffect(() => {
    renderMovies();
  }, [filteredMovies, filteredLongMovies, maxCards, checked]);

  // Клик по чекбоксу 'Короткометражки'
  const handleCheckboxClick = () => {
    setChecked(!checked);
  };

  // Клик на кнопку 'Еще'
  const handleLoadMoreBtnClick = () => {
    setMaxCards(maxCards + AddCardsOnBtnClick());
  };

  return (
    <>
      <SearchForm
        onSubmit={handleSearchBtnSubmit}
        onCheckboxClick={handleCheckboxClick}
        checked={checked}
      />
      <MoviesCardList
        moviesToRender={moviesToRender}
        btnLoadMoreIsVisible={loadMoreIsVisible}
        messageIsVisible={messageIsVisible}
        onLoadMoreBtnClick={handleLoadMoreBtnClick}
        onSaveMovieClick={props.onSaveMovieClick}
        hasResult={hasResult}
        preloaderIsVisible={preloaderIsVisible}
        errMessageIsVisible={props.errMessageIsVisible}
        savedMovies={props.savedMovies}
        errMessage={props.errMessage}
        setErrMessage={props.setErrMessage}
      />
    </>
  );
}

export default MoviesPage;
