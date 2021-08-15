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

  let text = '';
  if (props.messageIsVisible && !props.hasResult) {
    text = 'Ничего не найдено';
  }

  const loadMoreSectionClassName = cx({
    loadMoreSection: true,
    loadMoreSectionVisible: props.isButtonLoadMoreVisible,
  });

  return (
    <section className={styles.cardListSection}>
      <ul className={cardListClassName}>
        {props.moviesToRender.map((card) => <MoviesCard card={card} key={card.id} />)}
      </ul>
      <p className={styles.text}>{text}</p>
      <div className={loadMoreSectionClassName}>
        <button type='button' className={styles.loadMoreButton}>
          Ещё
        </button>
      </div>
      <Preloader preloaderIsVisible={props.preloaderIsVisible} />
    </section>
  );
}

export default MoviesCardList;
