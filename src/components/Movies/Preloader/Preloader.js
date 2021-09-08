import React from 'react';
import cn from 'classnames/bind';
import styles from './Preloader.module.scss';

const cx = cn.bind(styles);

function Preloader(props) {
  const preloaderClassName = cx({
    preloader: props.preloaderIsVisible,
    preloaderHidden: !props.preloaderIsVisible,
  });

  return (
    <div className={preloaderClassName}>
      <div className={styles.preloaderContainer}>
        <span className={styles.preloaderRound}> </span>
      </div>
    </div>
  );
}

export default Preloader;
