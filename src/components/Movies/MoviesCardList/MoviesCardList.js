import React from 'react';
import cn from 'classnames/bind';
import MoviesCard from '../MoviesCard/MoviesCard';
import styles from './MoviesCardList.module.scss';

const cx = cn.bind(styles);

function MoviesCardList(props) {
  const [hasResult, setHasResult] = React.useState(false);

  const loadMoreSectionClassName = cx({
    loadMoreSection: true,
    loadMoreSectionVisible: props.isButtonLoadMoreVisible,
  });

  return (
    <section className={styles.cardListSection}>
      <ul className={styles.cardList}>
        {props.moviesToRender.map((card) => <MoviesCard card={card} key={card.id} />)}
      </ul>
      <div className={loadMoreSectionClassName}>
        <button type='button' className={styles.loadMoreButton}>
          Ещё
        </button>
      </div>
    </section>
  );
}

export default MoviesCardList;
