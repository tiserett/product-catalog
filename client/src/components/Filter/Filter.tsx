import React from 'react'; //
import { Link } from 'react-router-dom';
import { FilterType } from '../../enums/FilterType';
import './Filter.scss';

type Props = {
  length: number | undefined;
  filterType: FilterType;
  handleFilterType: (filterType: FilterType) => void;
  perPage: number;
  setPerPage: (phonesPerPage: number) => void;
  setPage: (pageNumber: number) => void;
};

export const Filter: React.FC<Props> = ({
  length,
  filterType,
  handleFilterType,
  perPage,
  setPerPage,
  setPage,
}) => {
  const handleFilter = (value: string) => {
    switch (value) {
      case FilterType.ASC: {
        handleFilterType(FilterType.ASC);
        break;
      }

      case FilterType.DESC: {
        handleFilterType(FilterType.DESC);
        break;
      }

      case FilterType.OLDEST: {
        handleFilterType(FilterType.OLDEST);
        break;
      }

      default:
      case FilterType.NEWEST:
        handleFilterType(FilterType.NEWEST);
    }
  };

  return (
    <div className="grid">
      <div
        className="
          filter
          page__filter
          grid__item--mobile-1-4
        "
      >
        <div className="filter__logo">
          <Link to="/" className="filter__logo-home" />

          <Link to="/" className="filter__logo-vector" />

          <p className="filter__logo-text">Phones</p>
        </div>

        <h1 className="filter__title">Mobile phones</h1>

        <div className="device__count device__count-margin">
          {`${length} models`}
        </div>

        <div className="filter__sorts">
          <div className="sorts__item sorts__item-margin">
            <p className="sorts__text">Sort by</p>

            <select
              name="sort"
              id="sort"
              className="sorts__select"
              value={filterType}
              onChange={event => handleFilter(event.target.value)}
            >
              <option value={FilterType.NEWEST} className="sorts__option">
                Newest
              </option>

              <option value={FilterType.OLDEST} className="sorts__option">
                Oldest
              </option>

              <option value={FilterType.ASC} className="sorts__option">
                Ascending price
              </option>

              <option value={FilterType.DESC} className="sorts__option">
                Descending price
              </option>
            </select>
          </div>

          <div className="sorts__item">
            <p className="sorts__text">Items on page</p>

            <select
              name="show"
              id="show"
              className="sorts__select"
              value={perPage}
              onChange={event => {
                setPerPage(+event.target.value);
                setPage(1);
              }}
            >

              <option value="8" className="sorts__option">8</option>
              <option value="12" className="sorts__option">12</option>
              <option value="16" className="sorts__option">16</option>
              <option value="20" className="sorts__option">20</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
