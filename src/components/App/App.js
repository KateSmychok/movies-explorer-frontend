import React from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import api from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import MainPage from '../Main/MainPage/MainPage';
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
import getMovies from '../../utils/MoviesApi';
import { SetMaximumCards } from '../../utils/constants';

function App() {
  const [user, setUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isNavigationPopupOpened, setIsNavigationPopupOpened] = React.useState(false);
  const [isEditPopupOpened, setIsEditPopupOpened] = React.useState(false);
  const [isInfoToolTipOpened, setIsInfoToolTipOpened] = React.useState(false);
  const [isRegSuccess, setIsRegSuccess] = React.useState(true);

  const [maxCards, setMaxCards] = React.useState(SetMaximumCards());
  const [hasAttempt, setHasAttempt] = React.useState(false);
  const [hasResult, setHasResult] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [renderedMovies, setRenderedMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const [buttonLoadMoreIsVisible, setButtonLoadMoreIsVisible] = React.useState(false);
  const [preloaderIsVisible, setPreloaderIsVisible] = React.useState(false);
  const [messageIsVisible, setMessageIsVisible] = React.useState(false);

  const [errMessage, setErrMessage] = React.useState('');

  const history = useHistory();

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

  // Регистрация + авторизация
  const handleRegister = ({ name, email, password }) => {
    api.register(
      name,
      email,
      password,
    )
      .then((data) => {
        if (data) {
          setIsRegSuccess(true);
          setIsInfoToolTipOpened(true);
        } else {
          setIsRegSuccess(false);
          setIsInfoToolTipOpened(true);
        }
        return data;
      })
      .then((data) => {
        setUser(data);
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => setErrMessage(err.message));
  };

  // Закрыть любой попап
  const closeAllPopups = () => {
    setIsNavigationPopupOpened(false);
    setIsEditPopupOpened(false);
  };

  // Получение инфо о юзере при закрытии страницы и повторном входе
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
    setRenderedMovies([]);
    setButtonLoadMoreIsVisible(false);
    history.push('/signin');
  };

  const makeDefaultSettings = () => {
    setButtonLoadMoreIsVisible(false);
    setMessageIsVisible(false);
    setHasResult(false);
  };

  // Сабмит формы поиска
  const handleSearchButtonSubmit = ({ keyword }) => {
    makeDefaultSettings();
    setPreloaderIsVisible(true);
    setMaxCards(SetMaximumCards());
    setRenderedMovies([]);
    getMovies()
      .then((allMovies) => {
        const movies = allMovies.filter(
          (item) => item.nameRU.toLowerCase().indexOf(keyword.toLowerCase()) > -1,
        );
        setTimeout(
          () => {
            setFilteredMovies(movies);
            localStorage.setItem('movies', JSON.stringify(movies));
            setHasAttempt(true);
          }, 300,
        );
      })
      .catch(() => {
        setErrMessage(
          'Во время запроса произошла ошибка. '
          + 'Возможно, проблема с соединением или сервер недоступен. '
          + 'Подождите немного и попробуйте ещё раз',
        );
      });
  };

  // Рендер фильмов при новом поиске или изменении числа карточек
  React.useEffect(() => {
    if (filteredMovies.length > 0) {
      const moviesInLocalStorage = JSON.parse(localStorage.getItem('movies'));

      const movies = [];

      for (let i = 0; i < moviesInLocalStorage.length && i < maxCards; i += 1) {
        movies.push(moviesInLocalStorage[i]);
      }
      setRenderedMovies(movies);
      setMessageIsVisible(false);
      setTimeout(
        () => {
          setPreloaderIsVisible(false);
          setHasResult(true);
          if (moviesInLocalStorage.length > maxCards) {
            setButtonLoadMoreIsVisible(true);
          } else {
            setButtonLoadMoreIsVisible(false);
          }
        }, 300,
      );
    } else if (filteredMovies.length === 0 && hasAttempt) {
      setButtonLoadMoreIsVisible(false);
      setHasResult(false);
      setPreloaderIsVisible(false);
      setMessageIsVisible(true);
      setErrMessage('Ничего не найдено');
    } else {
      setPreloaderIsVisible(false);
      makeDefaultSettings();
    }
  }, [filteredMovies, maxCards]);

  // Клик на кнопку "Еще"
  const handleLoadMoreButtonClick = () => {
    let i;
    if (window.innerWidth >= 768) {
      i = 3;
    } else if (window.innerWidth >= 480) {
      i = 2;
    } else {
      i = 2;
    }
    setMaxCards(maxCards + i);
  };

  return (
    <CurrentUserContext.Provider value={user}>
      <div className="page">
        <Header onBurgerMenuClick={handleBurgerMenuClick} />
        <Switch>
          <Route exact path='/'>
            <MainPage />
          </Route>
          <ProtectedRoute
            path='/movies'
            loggedIn={loggedIn}
            renderedMovies={renderedMovies}
            isButtonLoadMoreVisible={buttonLoadMoreIsVisible}
            hasResult={hasResult}
            preloaderIsVisible={preloaderIsVisible}
            messageIsVisible={messageIsVisible}
            errMessage={errMessage}
            handleSearchButtonSubmit={handleSearchButtonSubmit}
            handleLoadMoreButtonClick={handleLoadMoreButtonClick}
            component={MoviesPage}
          />
          <ProtectedRoute
            path='/saved-movies'
            loggedIn={loggedIn}
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
