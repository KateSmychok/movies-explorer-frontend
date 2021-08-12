import React from 'react';
import cn from 'classnames/bind';
import styles from './InfoTooltip.module.scss';

const cx = cn.bind(styles);

function InfoToolTip(props) {
  function successOrFail() {
    let text;
    if (props.isRegSuccess) {
      text = 'Вы успешно зарегистрировались!';
    } else {
      text = 'Что-то пошло не так! Попробуйте ещё раз.';
    }
    return text;
  }

  return (
    <div className={cx({
      overlay: true,
      opened: props.isOpened,
    })}>
      <div className={styles.content}>
        <div className={cx({
          image: true,
          imageSuccess: props.isRegSuccess,
          imageFail: !props.isRegSuccess,
        })}> </div>
        <h3 className={styles.caption}>{successOrFail()}</h3>
        <button type='button' className={styles.closeButton} onClick={props.onClose}> </button>
      </div>
    </div>
  );
}

export default InfoToolTip;
