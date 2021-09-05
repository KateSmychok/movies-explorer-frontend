import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';

function SavedMoviesPage(props) {
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [moviesToRender, setMoviesToRender] = React.useState([]);

  const [somethingWasSearched, setSomethingWasSearched] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

  // Если ничего не найдено
  const setNotFoundStates = () => {
    props.setErrMessageIsVisible(true);
    props.setErrMessage('Ничего не найдено');
  };

  // Фильтр по ключевому слову
  const filterMoviesByKeyword = (keyword) => props.savedMovies.filter(
    (item) => item.nameRU.toLowerCase().indexOf(keyword.toLowerCase()) > -1,
  );

  // Фильтр по длительности
  const filterMoviesByDuration = (films) => films.filter(
    (item) => item.duration > 40,
  );

  // Сабмит формы поиска
  const handleSearchBtnSubmit = ({ keyword }) => {
    localStorage.setItem('keyword', keyword);
    setSomethingWasSearched(true);
    setFilteredMovies(filterMoviesByKeyword(keyword));
    props.setErrMessageIsVisible(false);
  };

  // Получение фильмов для рендера
  const getMoviesToRender = () => {
    props.setErrMessageIsVisible(false);
    // Если чекбокс +
    if (checked) {
      if (props.savedMovies.length === 0) {
        setMoviesToRender([]);
        props.setErrMessageIsVisible(false);
      } else if (!somethingWasSearched) {
        setMoviesToRender(props.savedMovies);
      } else if (somethingWasSearched) {
        const keyword = localStorage.getItem('keyword');
        const filMovies = filterMoviesByKeyword(keyword);
        if (filMovies.length > 0) {
          setMoviesToRender(filMovies);
        } else {
          setMoviesToRender([]);
          setNotFoundStates();
        }
      }
      // Если чекбокс -
    } else {
      if (props.savedMovies.length === 0) {
        setMoviesToRender([]);
        props.setErrMessageIsVisible(false);
      } else if (!somethingWasSearched) {
        const long = props.savedMovies.filter(
          (item) => item.duration > 40,
        );
        setMoviesToRender(long);
      } else if (somethingWasSearched) {
        const keyword = localStorage.getItem('keyword');
        const filMovies = filterMoviesByKeyword(keyword);
        if (filMovies.length > 0) {
          const filLongMovies = filterMoviesByDuration(filMovies);
          if (filLongMovies.length > 0) {
            setMoviesToRender(filLongMovies);
          } else {
            setMoviesToRender([]);
            setNotFoundStates();
          }
        } else {
          setMoviesToRender([]);
          setNotFoundStates();
        }
      }
    }
  };

  // Рендер фильмов
  React.useEffect(() => {
    setTimeout(() => {
      getMoviesToRender();
    }, 500);
  }, [somethingWasSearched, filteredMovies, props.savedMovies, checked]);

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
