import React from 'react';
import { Route, Switch } from 'react-router-dom';
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

function App() {
  const [user, setUser] = React.useState({ name: 'Kate', email: 'kate@yandex.ru' });
  const [isNavigationPopupOpened, setIsNavigationPopupOpened] = React.useState(false);

  const handleBurgerMenuClick = () => {
    setIsNavigationPopupOpened(true);
  };

  const handleNavigationLinkClick = () => {
    setIsNavigationPopupOpened(false);
  };

  const handleCloseButtonClick = () => {
    setIsNavigationPopupOpened(false);
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
            <Login />
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
