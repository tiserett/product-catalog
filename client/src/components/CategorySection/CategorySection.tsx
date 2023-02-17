import { NavLink } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import './CategorySection.scss';

type Props = {
  phones: Phone[];
};

export const CategorySection: React.FC<Props> = ({ phones }) => {
  return (
    <section className="home__section-category section-category container">
      <h2 className="title section-category__title">
        Shop by category
      </h2>
      <div className="section-category__baner-wrap">
        <div className="section-category__baner">
          <NavLink to="/Phones">
            <div
              className="section-category__img section-category__img--phones"
            />
          </NavLink>

          <h4 className="subtitle">
            <NavLink to="/Phones" className="section-category__subtitle">
              Mobile Phones
            </NavLink>
          </h4>

          <p className="section-category__product-count">
            {`${phones.length} models`}
          </p>
        </div>

        <div className="section-category__baner">
          <NavLink to="/Tablets">
            <div
              className="section-category__img section-category__img--tablets"
            />
          </NavLink>

          <h4 className="subtitle">
            <NavLink to="/Tablets" className="section-category__subtitle">
              Tablets
            </NavLink>
          </h4>

          <p className="section-category__product-count">
            24 models
          </p>
        </div>

        <div className="section-category__baner">
          <NavLink to="/Accessories">
            <div
              className="
            section-category__img
            section-category__img--accessories
          "
            />
          </NavLink>

          <h4 className="subtitle">
            <NavLink to="/Accessories" className="section-category__subtitle">
              Accessories
            </NavLink>
          </h4>

          <p className="section-category__product-count">
            100 models
          </p>
        </div>
      </div>
    </section>
  );
};
