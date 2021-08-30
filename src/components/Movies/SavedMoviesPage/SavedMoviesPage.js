import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';

function SavedMoviesPage(props) {
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [moviesToRender, setMoviesToRender] = React.useState([]);
  const [longMovies, setLongMovies] = React.useState([]);

  const [messageIsVisible, setMessageIsVisible] = React.useState(false);
  const [somethingWasSearched, setSomethingWasSearched] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

  // Сабмит формы поиска
  const handleSearchBtnSubmit = ({ keyword }) => {
    setFilteredMovies([]);
    setLongMovies([]);
    setSomethingWasSearched(true);
    setMessageIsVisible(false);
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
          setMessageIsVisible(true);
          props.setErrMessage('Ничего не найдено');
        }, 500);
      }
      // Если ничего не найдено
    } else {
      setTimeout(() => {
        setMessageIsVisible(true);
        props.setErrMessage('Ничего не найдено');
      }, 1000);
    }
  };

  // Получение фильмов для рендера
  const getMoviesToRender = () => {
    if (!somethingWasSearched && checked) {
      setMoviesToRender(props.savedMovies);
    } else if (!somethingWasSearched && !checked) {
      setMoviesToRender(props.savedMovies.filter(
        (item) => item.duration > 40,
      ));
    } else {
      if (checked) {
        setMoviesToRender(filteredMovies);
        setMessageIsVisible(false);
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
    if (!checked) {
      const movies = moviesToRender.filter(
        (item) => item.duration > 40,
      );
      if (movies.length > 0) {
        setLongMovies(movies);
      } else if (movies.length === 0 && somethingWasSearched) {
        setMoviesToRender([]);
        setMessageIsVisible(true);
        props.setErrMessage('Ничего не найдено');
      } else {
        setMoviesToRender([]);
        setMessageIsVisible(false);
      }
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
        messageIsVisible={messageIsVisible}
        errMessage={props.errMessage}
      />
    </>
  );
}

export default SavedMoviesPage;
