import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';
import api from '../../../api/MainApi';

function SavedMoviesPage(props) {
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [moviesToRender, setMoviesToRender] = React.useState([]);
  const [longMovies, setLongMovies] = React.useState([]);

  const [somethingWasSearched, setSomethingWasSearched] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

  // Получить список сохраненных фильмов
  React.useEffect(() => {
    api.getSavedMovies()
      .then((movies) => {
        props.setSavedMovies(movies);
      })
      .catch((err) => {
        props.setErrMessage(err.message);
        props.setErrMessageIsVisible(true);
      });
  }, []);

  // Если ничего не найдено
  const setNotFoundStates = () => {
    props.setErrMessageIsVisible(true);
    props.setErrMessage('Ничего не найдено');
  };

  // Сабмит формы поиска
  const handleSearchBtnSubmit = ({ keyword }) => {
    setFilteredMovies([]);
    setLongMovies([]);
    setSomethingWasSearched(true);
    props.setErrMessageIsVisible(false);
    // Фильтр по ключевому слову
    const filMovies = props.savedMovies.filter(
      (item) => item.nameRU.toLowerCase().indexOf(keyword.toLowerCase()) > -1,
    );
    // Если чекбокс +
    if (checked && filMovies.length > 0) {
      setFilteredMovies(filMovies);
      // Если чекбокс -
    } else if (!checked && filMovies.length > 0) {
      const movies = filMovies.filter(
        (item) => item.duration > 40,
      );
      if (movies.length > 0) {
        setLongMovies(movies);
      } else {
        setTimeout(() => {
          setNotFoundStates();
        }, 500);
      }
      // Если ничего не найдено
    } else {
      setTimeout(() => {
        setNotFoundStates();
      }, 1000);
    }
  };

  // Получение фильмов для рендера
  const getMoviesToRender = () => {
    props.setErrMessageIsVisible(false);
    if (!somethingWasSearched && checked) {
      setMoviesToRender(props.savedMovies);
    } else if (!somethingWasSearched && !checked) {
      setMoviesToRender(props.savedMovies.filter(
        (item) => item.duration > 40,
      ));
    } else {
      if (checked) {
        setMoviesToRender(filteredMovies);
        props.setErrMessageIsVisible(false);
      } else {
        setMoviesToRender(longMovies);
      }
    }
  };

  // Рендер фильмов
  React.useEffect(() => {
    setTimeout(() => {
      getMoviesToRender();
    }, 500);
  }, [somethingWasSearched, filteredMovies, longMovies, props.savedMovies]);

  // Ререндер фильмов при изменении стейта чекбокса
  React.useEffect(() => {
    // Если чекбокс -
    if (!checked) {
      const movies = moviesToRender.filter(
        (item) => item.duration > 40,
      );
      if (movies.length > 0) {
        setLongMovies(movies);
      } else if (movies.length === 0 && somethingWasSearched) {
        setMoviesToRender([]);
        setNotFoundStates();
      } else {
        setMoviesToRender([]);
        props.setErrMessageIsVisible(false);
      }
      // Если чекбокс +
    } else {
      getMoviesToRender();
    }
  }, [checked]);

  // Клик по чекбоксу 'Короткометражки'
  const handleCheckboxClick = () => {
    setChecked(!checked);
  };

  return (
    <>
      <SearchForm
        onSubmit={handleSearchBtnSubmit}
        onCheckboxClick={handleCheckboxClick}
        checked={checked}
      />
      <SavedMoviesCardList
        moviesToRender={moviesToRender}
        onMovieDelete={props.onMovieDelete}
        errMessage={props.errMessage}
        setErrMessage={props.setErrMessage}
        errMessageIsVisible={props.errMessageIsVisible}
        setErrMessageIsVisible={props.setErrMessageIsVisible}
      />
    </>
  );
}

export default SavedMoviesPage;
