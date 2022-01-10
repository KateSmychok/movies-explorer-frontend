import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import cn from 'classnames/bind';
import styles from './NavLink.module.scss';

const cx = cn.bind(styles);

function NavLink(props) {
  const location = useLocation();

  const linkClassName = cx({
    link: true,
    linkSelected: location.pathname === props.path,
  });

  return (
    <li className={styles.navItem}>
      <Link to={props.path} className={linkClassName}>
        {props.content}
      </Link>
    </li>
  );
}

export default NavLink;
