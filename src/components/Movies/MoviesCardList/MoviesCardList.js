import React from 'react';
import cn from 'classnames/bind';
import MoviesCard from '../MoviesCard/MoviesCard';
import styles from './MoviesCardList.module.scss';
import Preloader from '../Preloader/Preloader';

const cx = cn.bind(styles);

function MoviesCardList(props) {
  const cardListClassName = cx({
    cardList: props.hasResult,
    cardListHidden: !props.hasResult,
  });

  const loadMoreSectionClassName = cx({
    loadMoreSection: true,
    loadMoreSectionVisible: props.btnLoadMoreIsVisible,
  });

  return (
    <section className={styles.cardListSection}>
      {(props.errMessageIsVisible && !props.hasResult)
      && <p className={styles.errText}>{props.errMessage}</p>}
      <ul className={cardListClassName}>
        {props.moviesToRender.map((card) => <MoviesCard
          card={card}
          key={card.id}
          onSaveMovieClick={props.onSaveMovieClick}
          savedMovies={props.savedMovies}
        />)}
      </ul>
      <div className={loadMoreSectionClassName}>
        <button
          type='button'
          className={styles.loadMoreButton}
          onClick={props.onLoadMoreBtnClick}>
          Ещё
        </button>
      </div>
      <Preloader preloaderIsVisible={props.preloaderIsVisible} />
    </section>
  );
}

export default MoviesCardList;
