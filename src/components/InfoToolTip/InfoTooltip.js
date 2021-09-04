import React from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames/bind';
import styles from './InfoTooltip.module.scss';

const cx = cn.bind(styles);

function InfoToolTip(props) {
  const location = useLocation();

  function successOrFailReg() {
    let text;
    if (props.isRegSuccess) {
      text = 'Вы успешно зарегистрировались!';
    } else {
      text = 'Что-то пошло не так! Попробуйте ещё раз';
    }
    return text;
  }

  function successOrFailUpdate() {
    let text;
    if (props.isUpdateSuccess) {
      text = 'Данные успешно обновлены';
    } else {
      text = 'Что-то пошло не так! Попробуйте ещё раз';
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
          imageSuccess: props.isRegSuccess || props.isUpdateSuccess,
          imageFail: !props.isRegSuccess || !props.isUpdateSuccess,
        })}> </div>
        <h3 className={styles.caption}>{location.pathname === '/signup'
          ? successOrFailReg()
          : successOrFailUpdate()}
        </h3>
        <button type='button' className={styles.closeButton} onClick={props.onClose}> </button>
      </div>
    </div>
  );
}

export default InfoToolTip;
