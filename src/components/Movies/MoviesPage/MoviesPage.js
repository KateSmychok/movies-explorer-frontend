import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function MoviesPage(props) {
  return (
    <>
      <SearchForm onStartSearch={props.handleStartSearch} />
      <MoviesCardList
        moviesToRender={props.moviesToRender}
        isButtonLoadMoreVisible={props.isButtonLoadMoreVisible}
        hasResult={props.hasResult}
        preloaderIsVisible={props.preloaderIsVisible}
        messageIsVisible={props.messageIsVisible}/>
    </>
  );
}

export default MoviesPage;
