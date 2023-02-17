import { Link, NavLink, useLocation } from 'react-router-dom';
import './Footer.scss';

export const Footer: React.FC = () => {
  function Scroll() {
    window.scrollTo(0, 0);

    return useLocation().pathname;
  }

  const location = Scroll();

  return (
    <footer className="footer">
      <div className="footer__footer-logo footer-logo">
        <Link to="/" className="footer-logo__link" />
      </div>

      <div className="footer__footer-navigation footer-navigation">
        <a
          href="https://github.com/funnyTeamName"
          className="footer-navigation__link"
        >
          Github
        </a>

        <NavLink to="/" className="footer-navigation__link">
          Contacts
        </NavLink>

        <NavLink to="/" className="footer-navigation__link">
          Rights
        </NavLink>
      </div>

      <div className="footer__footer-rollback footer-rollback">
        <Link
          to={location}
          className="footer-rollback__text"
        >
          Back to top
        </Link>

        <Link
          to={location}
          className="button__secondary button__secondary--up-page"
        />
      </div>
    </footer>
  );
};
