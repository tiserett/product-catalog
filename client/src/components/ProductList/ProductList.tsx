import { useEffect, useState } from 'react'; //
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../pagination/Pagination';
import { FilterType } from '../../enums/FilterType';
import { Phone } from '../../types/Phone';
import { Filter } from '../Filter';
import { PhonesListItem } from './ProductListItem';

type Props = {
  phones: Phone[];
  selectedPhones: number[];
  setSelectedPhones: (value: number[]) => void;
  setPhoneId: (value: number) => void;
  likedPhones: number[];
  setLikedPhones: (value: number[]) => void;
};

function filterPhones(
  phones: Phone[],
  filterType: FilterType = FilterType.NEWEST,
): Phone[] {
  const visiblePhones = [...phones];

  visiblePhones.sort((p1, p2) => {
    switch (filterType) {
      case FilterType.ASC:
        return p1.price - p2.price;

      case FilterType.DESC:
        return p2.price - p1.price;

      case FilterType.OLDEST:
        return p1.year - p2.year;

      default:
      case FilterType.NEWEST:
        return p2.year - p1.year;
    }
  });

  return visiblePhones;
}

export const PhonesList: React.FC<Props> = ({
  phones,
  selectedPhones,
  setSelectedPhones,
  setPhoneId,
  likedPhones,
  setLikedPhones,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(+(searchParams.get('page') || 1));
  const [perPage, setPerPage] = useState(+(searchParams.get('perPage') || 8));
  const [filterType, setFilterType] = useState<FilterType>(FilterType.NEWEST);

  useEffect(() => {
    const params = new URLSearchParams();

    params.append('page', `${page}`);
    params.append('perPage', `${perPage}`);

    setSearchParams(params.toString());
  }, [page, perPage]);

  const from = ((page - 1) * perPage) + 1;
  const to = Math.min(phones.length, page * perPage);

  const currentPhones = filterPhones(phones, filterType);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="container">
      <Filter
        length={phones?.length}
        filterType={filterType}
        handleFilterType={setFilterType}
        perPage={perPage}
        setPerPage={setPerPage}
        setPage={setPage}
      />

      <div className="page__product-list grid--cards">
        {currentPhones.slice(from - 1, to).map(phone => (
          <PhonesListItem
            key={phone.id}
            phone={phone}
            selectedPhones={selectedPhones}
            setSelectedPhones={setSelectedPhones}
            setPhoneId={setPhoneId}
            size
            likedPhones={likedPhones}
            setLikedPhones={setLikedPhones}
          />
        ))}
      </div>

      <Pagination
        totalPhones={phones.length}
        perPage={perPage}
        page={page}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};
