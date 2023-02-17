import classNames from 'classnames'; //
import { ButtonClassModifier, ButtonClassType } from '../../enums/ButtonEnum';
// import './_pagination.scss';

type Props = {
  totalPhones: number,
  perPage: number,
  page: number,
  handlePageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  totalPhones,
  perPage,
  page,
  handlePageChange,
}) => {
  const total = Math.ceil(totalPhones / perPage);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const nextPage = +(event.currentTarget.dataset.page || 0);

    if (
      nextPage === page || nextPage < 1 || nextPage > total
    ) {
      return;
    }

    handlePageChange(nextPage);
  };

  function getPageNumbers(from: number, to: number): number[] {
    const numbers = [];

    for (let i = from; i <= to; i += 1) {
      numbers.push(i);
    }

    return numbers;
  }

  return (
    <div className="page__pagination pagination">
      <a // eslint-disable-line jsx-a11y/anchor-has-content
        href="#prev"
        aria-label="link"
        aria-disabled={page === 1}
        data-page={page - 1}
        className={classNames(
          'pagination__prev-btn',
          { 'pagination__prev-btn-disabled': page === 1 },
          ButtonClassType.SECONDARY,
          ButtonClassModifier.PREV_PAGE,
        )}
        onClick={handleClick}
      />

      <ul className="pagination__list">
        {getPageNumbers(1, total)
          .splice(total - page <= 3 ? total - 4 : page - 1, 4)
          .map(currentPage => {
            return (
              <li
                className="pagination__page-number"
                key={currentPage}
              >
                <a
                  href={`#${currentPage}`}
                  data-page={currentPage}
                  className={classNames(
                    ButtonClassType.SECONDARY,
                    ButtonClassModifier.NUM_PAGE,
                    { 'pagination__active-button': (currentPage === page) },
                  )}
                  onClick={handleClick}
                >
                  {currentPage}
                </a>
              </li>
            );
          })}
      </ul>

      <a // eslint-disable-line jsx-a11y/anchor-has-content
        href="#/next"
        aria-label="link"
        aria-disabled={page === total}
        data-page={page + 1}
        className={classNames(
          'pagination__next-btn',
          { 'pagination__next-btn-disabled': page === total },
          ButtonClassType.SECONDARY,
          ButtonClassModifier.NEXT_PAGE,
        )}
        onClick={handleClick}
      />
    </div>
  );
};
