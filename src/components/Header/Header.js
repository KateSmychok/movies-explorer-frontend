import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import cn from 'classnames';
import HeaderStyles from './Header.module.scss';

function Header() {
  return (
    <Switch>
      <Route path='/'>
        <div className={cn(HeaderStyles.header, HeaderStyles.headerMain)}>
          <Link to="/" className={HeaderStyles.logo}></Link>
          <div className={HeaderStyles.buttonsArea}>
            <Link to="/signup" className={HeaderStyles.regButton}>Регистрация</Link>
            <Link to="/signin" className={HeaderStyles.authButton}>Войти</Link>
          </div>
        </div>
      </Route>
    </Switch>
  )
}

export default Header;
