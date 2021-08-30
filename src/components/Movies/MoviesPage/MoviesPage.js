import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { SetMaximumCards, AddCardsOnBtnClick } from '../../../utils/constants';
import getAllMovies from '../../../utils/MoviesApi';

function MoviesPage(props) {
  const [maxCards, setMaxCards] = React.useState(SetMaximumCards());
  const [hasResult, setHasResult] = React.useState(false);

  const [allMovies, setAllMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [moviesToRender, setMoviesToRender] = React.useState([]);
  const [longMovies, setLongMovies] = React.useState([]);

  const [btnLoadMoreIsVisible, setBtnLoadMoreIsVisible] = React.useState(false);
  const [preloaderIsVisible, setPreloaderIsVisible] = React.useState(false);
  const [messageIsVisible, setMessageIsVisible] = React.useState(false);

  const [checked, setChecked] = React.useState(true);

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
    localStorage.removeItem('long-movies');
    setDefaultStates();
    setPreloaderIsVisible(true);
    // Фильтр по ключевому слову
    const filMovies = allMovies.filter(
      (item) => item.nameRU.toLowerCase().indexOf(keyword.toLowerCase()) > -1,
    );
    // Если чекбокс +
    if (checked && filMovies.length > 0) {
      setFilteredMovies(filMovies);
      localStorage.setItem('movies', JSON.stringify(filMovies));
    // Если чекбокс -
    } else if (!checked && filMovies.length > 0) {
      const movies = filMovies.filter(
        (item) => item.duration > 40,
      );
      if (movies.length > 0) {
        setLongMovies(movies);
        localStorage.setItem('long-movies', JSON.stringify(movies));
      } else {
        setMessageIsVisible(true);
        props.setErrMessage('Ничего не найдено');
      }
      setPreloaderIsVisible(false);
      // Если ничего не найдено
    } else {
      setFilteredMovies([]);
      setLongMovies([]);
      setDefaultStates();
      setPreloaderIsVisible(false);
      setMessageIsVisible(true);
      props.setErrMessage('Ничего не найдено');
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
    setTimeout(
      () => {
        setPreloaderIsVisible(false);
        setHasResult(true);
        if (films.length > maxCards) {
          setBtnLoadMoreIsVisible(true);
        } else {
          setBtnLoadMoreIsVisible(false);
        }
      }, 500,
    );
  };

  // Ререндер фильмов при изменении ключевого слова или количества карточек для рендера
  React.useEffect(() => {
    if (checked) {
      if (filteredMovies.length > 0) {
        getMoviesToRender(filteredMovies);
      } else if (localStorage.getItem('movies') && filteredMovies.length === 0) {
        const moviesInLocalStorage = JSON.parse(localStorage.getItem('movies'));
        getMoviesToRender(moviesInLocalStorage);
      } else {
        setTimeout(() => {
          setDefaultStates();
        }, 500);
      }
    } else {
      if (longMovies.length > 0) {
        getMoviesToRender(longMovies);
      } else if (localStorage.getItem('long-movies') && longMovies.length === 0) {
        const moviesInLocalStorage = JSON.parse(localStorage.getItem('long-movies'));
        getMoviesToRender(moviesInLocalStorage);
      } else {
        setTimeout(() => {
          setDefaultStates();
        }, 500);
      }
    }
  }, [filteredMovies, maxCards, longMovies]);

  // Получение фильмов > 40 мин.
  const getFilteredByDurationMovies = (films) => {
    if (!checked && films.length > 0) {
      const movies = films.filter(
        (item) => item.duration > 40,
      );
      if (movies.length > 0) {
        setLongMovies(movies);
        localStorage.setItem('long-movies', JSON.stringify(movies));
      } else {
        setDefaultStates();
        setMessageIsVisible(true);
        props.setErrMessage('Ничего не найдено');
      }
    } else if (checked) {
      setLongMovies([]);
      localStorage.removeItem('long-movies');
    }
  };

  // Ререндер короткометражек при изменении стейта чекбокса
  React.useEffect(() => {
    if (filteredMovies.length > 0) {
      getFilteredByDurationMovies(filteredMovies);
    } else if (localStorage.getItem('movies') && filteredMovies.length === 0) {
      const moviesInLocalStorage = JSON.parse(localStorage.getItem('movies'));
      getFilteredByDurationMovies(moviesInLocalStorage);
    } else {
      setDefaultStates();
    }
  }, [checked]);

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
        btnLoadMoreIsVisible={btnLoadMoreIsVisible}
        onLoadMoreBtnClick={handleLoadMoreBtnClick}
        onSaveMovieClick={props.onSaveMovieClick}
        hasResult={hasResult}
        preloaderIsVisible={preloaderIsVisible}
        messageIsVisible={messageIsVisible}
        savedMovies={props.savedMovies}
        errMessage={props.errMessage}
      />
    </>
  );
}

export default MoviesPage;
