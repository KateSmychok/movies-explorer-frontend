import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function MoviesPage() {
  return (
    <>
      <SearchForm />
      <MoviesCardList />
    </>
  )
}

export default MoviesPage;
