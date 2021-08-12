import React from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import MainPage from '../Main/MainPage/MainPage';
import Footer from '../Footer/Footer';
import MoviesPage from '../Movies/MoviesPage/MoviesPage';
import SavedMoviesPage from '../Movies/SavedMoviesPage/SavedMoviesPage';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import NavigationPopup from '../NavigationPopup/NavigationPopup';
import api from '../../utils/MainApi';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import InfoToolTip from '../InfoToolTip/InfoTooltip';

function App() {
  const [user, setUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isNavigationPopupOpened, setIsNavigationPopupOpened] = React.useState(false);
  const [isEditPopupOpened, setIsEditPopupOpened] = React.useState(false);
  const [isInfoToolTipOpened, setIsInfoToolTipOpened] = React.useState(false);
  const [isRegSuccess, setIsRegSuccess] = React.useState(true);
  const history = useHistory();

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
        });
    }
  }, []);

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
            .catch((err) => console.log(err));
        }
      });
  };

  // Регистрация
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
      });
  };

  // Закрытие попапа об успешной/неудачной регистрации
  const closeInfoToolTip = () => {
    setIsInfoToolTipOpened(false);
    if (isRegSuccess) {
      history.push('/movies');
    }
  };

  // Открытие попапа редактирования профиля
  const handleEditButtonClick = () => {
    setIsEditPopupOpened(true);
  };

  // Открытие навбара
  const handleBurgerMenuClick = () => {
    setIsNavigationPopupOpened(true);
  };

  // Клик по любой ссылке навбара
  const handleNavigationLinkClick = () => {
    setIsNavigationPopupOpened(false);
  };

  // Закрыть любой попап
  const closeAllPopups = () => {
    setIsNavigationPopupOpened(false);
    setIsEditPopupOpened(false);
  };

  // Обновление профиля
  const handleUpdateUser = ({ name, email }) => {
    api.updateCurrentUser(name, email)
      .then((userInfo) => {
        setUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
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
    history.push('/signin');
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
            <Footer />
          </Route>
          <Route path='/movies'>
            <Footer />
          </Route>
          <Route path='/saved-movies'>
            <Footer />
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
