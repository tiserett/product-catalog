import React from 'react'; //
import { Link } from 'react-router-dom';
import { HeaderNav } from '../HeaderNavigation';
import { HeaderRight } from '../HeaderRightBlock';
import { BurgerMenu } from '../BurgerMenu';
import './Header.scss';

export const Header: React.FC = () => (
  <header className="header">
    <div className="header__logo logo">
      <Link to="/" className="logo__link" />
    </div>

    <HeaderNav />
    <HeaderRight />
    <BurgerMenu />
  </header>
);
