import React from 'react'; //
import { Link } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import { PhonesListItem } from '../ProductList/ProductListItem';
import './Favourites.scss';

type Props = {
  phones: Phone[];
  likedPhones: number[];
  setLikedPhones: (value: number[]) => void;
  setPhoneId: (value: number) => void;
  selectedPhones: number[];
  setSelectedPhones: (value: number[]) => void;
};

export const Favourites: React.FC<Props> = ({
  phones,
  likedPhones,
  setLikedPhones,
  setPhoneId,
  selectedPhones,
  setSelectedPhones,
}) => {
  const visiblePhones = phones.filter(phone => (
    likedPhones.includes(phone.id)
  ));

  return (
    <div className="container">
      <div className="favourites">
        <div className="favourites__logo">
          <Link to="/" className="favourites__logo-home" />
          <Link to="/" className="favourites__logo-vector" />
          <p className="favourites__logo-vector-text">Favourites</p>
        </div>
        <div className="favourites__title">
          <p className="favourites__title-text">Favourites</p>
          <p className="favourites__count">
            {visiblePhones.length}
            &nbsp;items
          </p>
        </div>

        <div className="favourites__phones grid--cards">
          {visiblePhones.map((phone) => (
            <PhonesListItem
              key={phone.id}
              phone={phone}
              selectedPhones={selectedPhones}
              setSelectedPhones={setSelectedPhones}
              setPhoneId={setPhoneId}
              setLikedPhones={setLikedPhones}
              likedPhones={likedPhones}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
