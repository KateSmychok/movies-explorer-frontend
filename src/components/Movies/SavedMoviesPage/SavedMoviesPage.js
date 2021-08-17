import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';

function SavedMoviesPage(props) {
  return (
    <>
      <SearchForm />
      <SavedMoviesCardList
        savedMovies={props.savedMovies}
        onMovieDelete={props.onMovieDelete}
      />
    </>
  );
}

export default SavedMoviesPage;
