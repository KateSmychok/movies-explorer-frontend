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

function App() {
  const [currentUser, setCurrentUser] = React.useState({});

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
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
          {/*
          <Route path='/signin'>
            <Login />
          </Route>
          */}
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
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
