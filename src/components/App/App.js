import React from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import api from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import MainPage from '../Main/MainPage/MainPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SavedMoviesPage from '../Movies/SavedMoviesPage/SavedMoviesPage';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import NavigationPopup from '../NavigationPopup/NavigationPopup';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import InfoToolTip from '../InfoToolTip/InfoTooltip';
import MoviesPage from '../Movies/MoviesPage/MoviesPage';

function App() {
  const [user, setUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [isNavigationPopupOpened, setIsNavigationPopupOpened] = React.useState(false);
  const [isEditPopupOpened, setIsEditPopupOpened] = React.useState(false);
  const [isInfoToolTipOpened, setIsInfoToolTipOpened] = React.useState(false);

  const [isRegSuccess, setIsRegSuccess] = React.useState(true);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [errMessage, setErrMessage] = React.useState('');

  const history = useHistory();

  // Получить список сохраненных фильмов
  React.useEffect(() => {
    api.getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies);
      });
  }, []);

  // Удалить сохраненный фильм и обновить список
  const handleMovieDelete = (movieId) => {
    api.deleteMovieFromSaved(movieId)
      .then(() => {
        setSavedMovies((state) => state.filter((m) => m._id !== movieId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Сохранить или удалить из сохраненных фильм и обновить список
  const handleMovieSaveOrDelete = ({
    nameRU,
    image,
    trailerLink,
    duration,
  }) => {
    const isSaved = savedMovies.some((i) => i.nameRU === nameRU);
    if (!isSaved) {
      api.saveMovie(
        nameRU,
        image,
        trailerLink,
        duration,
      )
        .then((savedMovie) => {
          setSavedMovies([savedMovie, ...savedMovies]);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      const cardToDelete = savedMovies.find((i) => i.nameRU === nameRU);
      handleMovieDelete(cardToDelete._id);
    }
  };

  // Авторизация
  const handleLogin = ({ email, password }) => {
    api.login(email, password)
      .then((data) => {
        if (data.token) {
          api.getCurrentUser(data.token)
            .then((userInfo) => {
              setUser(userInfo);
            })
            .then(() => {
              setTimeout(() => {
                setLoggedIn(true);
                history.push('/movies');
              }, 500);
            })
            .catch((err) => setErrMessage(err.message));
        }
      });
  };

  // Регистрация + автоматическая авторизация
  const handleRegister = ({ name, email, password }) => {
    api.register(name, email, password)
      .then((data) => {
        if (data) {
          setIsRegSuccess(true);
          setIsInfoToolTipOpened(true);
        } else {
          setIsRegSuccess(false);
          setIsInfoToolTipOpened(true);
        }
        setUser(data);
      })
      .catch((err) => setErrMessage(err.message));
  };

  // Закрыть любой попап
  const closeAllPopups = () => {
    setIsNavigationPopupOpened(false);
    setIsEditPopupOpened(false);
  };

  // При закрытии страницы и повторном входе
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.getCurrentUser(token)
        .then((userInfo) => {
          if (userInfo) {
            setUser(userInfo);
            setLoggedIn(true);
            history.push('/movies');
          }
        })
        .catch((err) => setErrMessage(err.message));

      api.getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies);
        })
        .catch((err) => setErrMessage(err.message));
    }
  }, []);

  // Открытие попапа редактирования профиля
  const handleEditButtonClick = () => {
    setIsEditPopupOpened(true);
  };

  // Обновление профиля
  const handleUpdateUser = ({ name, email }) => {
    api.updateCurrentUser(name, email)
      .then((userInfo) => {
        setUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        setErrMessage(err.message);
      });
  };

  // Закрытие попапа об успешной/неудачной регистрации
  const closeInfoToolTip = () => {
    setIsInfoToolTipOpened(false);
    if (isRegSuccess) {
      setLoggedIn(true);
      history.push('/movies');
    }
  };

  // Открытие навбара
  const handleBurgerMenuClick = () => {
    setIsNavigationPopupOpened(true);
  };

  // Клик по любой ссылке навбара
  const handleNavigationLinkClick = () => {
    setIsNavigationPopupOpened(false);
  };

  // Выход
  const handleSignOut = () => {
    localStorage.clear();
    setUser({
      name: '',
      email: '',
      password: '',
    });
    setLoggedIn(false);
    history.push('/');
  };

  return (
    <CurrentUserContext.Provider value={user}>
      <div className="page">
        <Switch>
          <Route exact path='/'>
            <Header />
          </Route>
          <Route path='/movies'>
            <Header onBurgerMenuClick={handleBurgerMenuClick} />
          </Route>
          <Route path='/saved-movies'>
            <Header onBurgerMenuClick={handleBurgerMenuClick} />
          </Route>
          <Route path='/profile'>
            <Header onBurgerMenuClick={handleBurgerMenuClick} />
          </Route>
        </Switch>
        <Switch>
          <Route exact path='/'>
            <MainPage />
          </Route>
          <ProtectedRoute
            path='/movies'
            loggedIn={loggedIn}
            savedMovies={savedMovies}
            onSaveMovieClick={handleMovieSaveOrDelete}
            errMessage={errMessage}
            setErrMessage={setErrMessage}
            component={MoviesPage}
          />
          <ProtectedRoute
            path='/saved-movies'
            loggedIn={loggedIn}
            savedMovies={savedMovies}
            onMovieDelete={handleMovieDelete}
            errMessage={errMessage}
            setErrMessage={setErrMessage}
            component={SavedMoviesPage}
          />
          <ProtectedRoute
            path='/profile'
            loggedIn={loggedIn}
            component={Profile}
            onEditButtonClick={handleEditButtonClick}
            onSignOut={handleSignOut}
          />
          <Route path='/signup'>
            <Register onSubmit={handleRegister} />
          </Route>
          <Route path='/signin'>
            <Login onSubmit={handleLogin} />
          </Route>
          <Route path=''>
            <NotFoundPage />
          </Route>
        </Switch>
        <Switch>
          <Route exact path='/'>
            <Footer/>
          </Route>
          <Route path='/movies'>
            <Footer/>
          </Route>
          <Route path='/saved-movies'>
            <Footer/>
          </Route>
        </Switch>
        <NavigationPopup
          isNavigationPopupOpened={isNavigationPopupOpened}
          onLinkClick={handleNavigationLinkClick}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isEditPopupOpened={isEditPopupOpened}
          onClose={closeAllPopups}
          onSubmit={handleUpdateUser}
        />
        <InfoToolTip
          isOpened={isInfoToolTipOpened}
          isRegSuccess={isRegSuccess}
          onClose={closeInfoToolTip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
