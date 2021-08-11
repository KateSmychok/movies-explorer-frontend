import React from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
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

function App() {
  const [user, setUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isNavigationPopupOpened, setIsNavigationPopupOpened] = React.useState(false);
  const history = useHistory();

  const handleBurgerMenuClick = () => {
    setIsNavigationPopupOpened(true);
  };

  const handleNavigationLinkClick = () => {
    setIsNavigationPopupOpened(false);
  };

  const handleCloseButtonClick = () => {
    setIsNavigationPopupOpened(false);
  };

  const handleLogin = ({ email, password }) => {
    api.login(
      email,
      password,
    )
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={user}>
      <div className="page">
        <Header onClick={handleBurgerMenuClick} />
        <Switch>
          <Route exact path='/'>
            <MainPage />
          </Route>
          <Route path='/movies'>
            <MoviesPage />
          </Route>
          <Route path='/saved-movies'>
            <SavedMoviesPage />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path='/signup'>
            <Register />
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
          onClose={handleCloseButtonClick}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
