import React from 'react'; //
import { NavLink, Link } from 'react-router-dom';
import './Menu.scss';

type Props = {
  items: {
    value: string;
    href: string;
  }[];
  active: boolean;
  setActive: (active: boolean) => void;
};

export const Menu: React.FC<Props> = ({
  items,
  active,
  setActive,
}) => {
  return (
    <menu>
      <button
        type="button"
        className={active
          ? 'menu active'
          : 'menu'}
        onClick={() => setActive(false)}
      >
        <div
          aria-hidden="true"
          className="menu__content"
        >
          <ul className="menu__list">
            {items.map((item) => (
              <li className="menu__items">
                <Link
                  className="menu__link"
                  to={item.href}
                >
                  {item.value}
                </Link>
              </li>
            ))}
          </ul>
          <div className="menu__bottom">
            <NavLink
              to="/favourites"
              className="
                header__header-right-link
                header__header-right-link-liked
                menu__bottom-link
              "
            />
            <NavLink
              to="/Shopping"
              className="
                header__header-right-link
                header__header-right-link-shoping
                menu__bottom-link
              "
            />
          </div>
        </div>
      </button>
    </menu>
  );
};
