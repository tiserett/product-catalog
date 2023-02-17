import React, { useState } from 'react';
import { Menu } from '../Menu/Menu';
import './BurgerMenu.scss';

export const BurgerMenu: React.FC = () => {
  const [menuActive, setMenuActive] = useState(false);

  const items = [
    { value: 'Home', href: '/Home' },
    { value: 'Phones', href: '/Phones' },
    { value: 'Tablets', href: '/Tablets' },
    { value: 'Accessories', href: '/Accessories' },
  ];

  const toggleMenuActive = () => {
    if (menuActive) {
      window.document.body.style.overflow = 'hidden';
    } else {
      window.document.body.style.overflow = 'visible';
    }
  };

  toggleMenuActive();

  return (
    <div>
      <div className="burger">
        <button
          type="button"
          className={!menuActive
            ? 'burger__button'
            : 'burger__button active'}
          onClick={() => setMenuActive(!menuActive)}
          aria-label="Menu"
        />
      </div>
      <Menu
        active={menuActive}
        setActive={setMenuActive}
        items={items}
      />
    </div>
  );
};
