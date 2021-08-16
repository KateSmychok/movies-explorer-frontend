import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function MoviesPage(props) {
  return (
    <>
      <SearchForm onSubmit={props.handleSearchButtonSubmit} />
      <MoviesCardList
        renderedMovies={props.renderedMovies}
        isButtonLoadMoreVisible={props.isButtonLoadMoreVisible}
        handleLoadMoreButtonClick={props.handleLoadMoreButtonClick}
        hasResult={props.hasResult}
        preloaderIsVisible={props.preloaderIsVisible}
        messageIsVisible={props.messageIsVisible}
        errMessage={props.errMessage}/>
    </>
  );
}

export default MoviesPage;
