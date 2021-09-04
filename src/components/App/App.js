import React from 'react';
import {
  useHistory,
  useLocation,
  Route,
  Switch,
} from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import api from '../../api/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import MainPage from '../Main/MainPage/MainPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesPage from '../Movies/MoviesPage/MoviesPage';
import SavedMoviesPage from '../Movies/SavedMoviesPage/SavedMoviesPage';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import NavigationPopup from '../NavigationPopup/NavigationPopup';
import InfoToolTip from '../InfoToolTip/InfoTooltip';

function App() {
  const [user, setUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const [isNavigationPopupOpened, setIsNavPopupOpened] = React.useState(false);
  const [isInfoToolTipOpened, setIsInfoToolTipOpened] = React.useState(false);

  const [isUpdateSuccess, setIsUpdateSuccess] = React.useState(true);
  const [isRegSuccess, setIsRegSuccess] = React.useState(true);

  const [errMessage, setErrMessage] = React.useState('');
  const [errMessageIsVisible, setErrMessageIsVisible] = React.useState(false);

  const history = useHistory();
  const location = useLocation();

  // Удалить сохраненный фильм и обновить список
  const handleMovieDelete = (movieId) => {
    api.deleteMovieFromSaved(movieId)
      .then(() => {
        setSavedMovies((state) => state.filter((m) => m._id !== movieId));
      })
      .catch((err) => {
        setErrMessage(err.message);
        setErrMessageIsVisible(true);
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
          setErrMessage(err.message);
          setErrMessageIsVisible(true);
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
            .catch((err) => {
              setErrMessage(err.message);
              setErrMessageIsVisible(true);
            });
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
        }
      })
      .then(() => {
        handleLogin({ email, password });
      })
      .catch(() => {
        setIsRegSuccess(false);
        setIsInfoToolTipOpened(true);
      });
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
            history.push(location.pathname === '/signup' || location.pathname === '/signin'
              ? '/'
              : location.pathname);
          }
        })
        .catch((err) => {
          setErrMessage(err.message);
          setErrMessageIsVisible(true);
        });
    }
  }, []);

  // Обновление профиля
  const handleUpdateUser = ({ name, email }) => {
    api.updateCurrentUser(name, email)
      .then((data) => {
        if (data) {
          setUser(data);
          setIsUpdateSuccess(true);
          setIsInfoToolTipOpened(true);
        }
      })
      .catch(() => {
        setIsUpdateSuccess(false);
        setIsInfoToolTipOpened(true);
      });
  };

  // Закрытие попапа об успешной/неудачной регистрации
  const closeInfoToolTip = () => {
    setIsInfoToolTipOpened(false);
  };

  // Открытие навбара
  const handleBurgerMenuClick = () => {
    setIsNavPopupOpened(true);
  };

  // Клик по любой ссылке навбара
  const handleNavigationLinkClick = () => {
    setIsNavPopupOpened(false);
  };

  // Закрытие навбара
  const closeNavPopup = () => {
    setIsNavPopupOpened(false);
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
            errMessageIsVisible={errMessageIsVisible}
            setErrMessageIsVisible={setErrMessageIsVisible}
            component={MoviesPage}
          />
          <ProtectedRoute
            path='/saved-movies'
            loggedIn={loggedIn}
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
            onMovieDelete={handleMovieDelete}
            errMessage={errMessage}
            setErrMessage={setErrMessage}
            errMessageIsVisible={errMessageIsVisible}
            setErrMessageIsVisible={setErrMessageIsVisible}
            component={SavedMoviesPage}
          />
          <ProtectedRoute
            path='/profile'
            loggedIn={loggedIn}
            component={Profile}
            onSubmit={handleUpdateUser}
            onSignOut={handleSignOut}
          />
          <Route path='/signup'>
            <Register
              onSubmit={handleRegister}
            />
          </Route>
          <Route path='/signin'>
            <Login
              onSubmit={handleLogin}
              errMessage={errMessage}
              errMessageIsVisible={errMessageIsVisible}
            />
          </Route>
          <Route path='*'>
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
          onClose={closeNavPopup}
        />
        <InfoToolTip
          isOpened={isInfoToolTipOpened}
          isUpdateSuccess={isUpdateSuccess}
          isRegSuccess={isRegSuccess}
          onClose={closeInfoToolTip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
