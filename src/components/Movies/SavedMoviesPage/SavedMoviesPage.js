import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';

function SavedMoviesPage(props) {
  return (
    <>
      <SearchForm />
      <SavedMoviesCardList onSaveCard={props.onSaveCard} />
    </>
  );
}

export default SavedMoviesPage;
