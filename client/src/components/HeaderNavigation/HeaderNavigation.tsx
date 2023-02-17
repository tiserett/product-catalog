import classNames from 'classnames'; //
import React from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderNavigation.scss';

export const HeaderNav: React.FC = () => (
  <nav className="header__header-navigation">
    <NavLink
      to="/Home"
      className={({
        isActive,
      }) => classNames('header-navigation__link',
        { 'header-navigation__link--active': isActive })}
    >
      Home
    </NavLink>
    <NavLink
      to="/Phones"
      className={({
        isActive,
      }) => classNames('header-navigation__link',
        { 'header-navigation__link--active': isActive })}
    >
      Phones
    </NavLink>
  </nav>
);
