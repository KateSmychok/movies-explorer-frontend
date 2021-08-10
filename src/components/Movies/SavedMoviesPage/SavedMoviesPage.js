import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';

function SavedMoviesPage() {
  return (
    <>
      <SearchForm />
      <SavedMoviesCardList />
    </>
  );
}

export default SavedMoviesPage;
