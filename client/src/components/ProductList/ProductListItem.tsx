import { Link } from 'react-router-dom'; //
import classNames from 'classnames';
import {
  ButtonClassModifier,
  ButtonClassType,
  ButtonType,
} from '../../enums/ButtonEnum';
import { Button } from '../Button';
import { Phone } from '../../types/Phone';
import './ProductCard.scss';

type Props = {
  phone: Phone;
  selectedPhones: number[];
  setSelectedPhones: (value: number[]) => void;
  setPhoneId: (value: number) => void;
  size?: boolean;
  likedPhones: number[];
  setLikedPhones: (value: number[]) => void;
};

export const PhonesListItem: React.FC<Props> = ({
  phone,
  selectedPhones,
  setSelectedPhones,
  setPhoneId,
  size,
  likedPhones,
  setLikedPhones,
}) => {
  return (
    <div className={classNames('card',
      {
        'card--size': (size),
      })}
    >
      <Link
        to={`/Phones/${phone.id}`}
        onClick={() => setPhoneId(phone.id)}
      >
        <img
          src={`https://product-server.onrender.com/${phone.image}`}
          className="card__img"
          alt="product"
        />
      </Link>

      <div className={classNames('card__description-content',
        {
          'card__description-content--size': (size),
        })}
      >
        <p className="card__product-title">
          {phone.name}
        </p>

        <p className="card__price">
          $
          {phone.price}

          <s className="card__price card__price--old">
            $
            {phone.fullPrice}
          </s>
        </p>

        <div className="card__decorative-line" />

        <div className="card__description">
          <div className="card__product-description">
            <span className="card__subtitle">
              Screen
            </span>

            <span className="card__features">
              {phone.screen}
            </span>
          </div>

          <div className="card__product-description">
            <span className="card__subtitle">
              Capacity
            </span>

            <span className="card__features">
              {phone.capacity}
            </span>
          </div>

          <div className="card__product-description">
            <span className="card__subtitle">
              RAM
            </span>

            <span className="card__features">
              {phone.ram}
            </span>
          </div>
        </div>

        <div className="card__buttons">
          {selectedPhones.includes(phone.id)
            ? (
              <Button
                title="Added to cart"
                btnClassType={ButtonClassType.PRIMARY}
                btnClassModifier={ButtonClassModifier.ADDED}
                selectedPhones={selectedPhones}
                setSelectedPhones={setSelectedPhones}
                phoneId={phone.id}
                type={ButtonType.CART}
                likedPhones={likedPhones}
                setLikedPhones={setLikedPhones}
              />
            )
            : (
              <Button
                title="Add to cart"
                btnClassType={ButtonClassType.PRIMARY}
                selectedPhones={selectedPhones}
                setSelectedPhones={setSelectedPhones}
                phoneId={phone.id}
                type={ButtonType.CART}
                likedPhones={likedPhones}
                setLikedPhones={setLikedPhones}
              />
            )}

          <Button
            btnClassType={ButtonClassType.SECONDARY}
            btnClassModifier={ButtonClassModifier.HEART}
            selectedPhones={selectedPhones}
            setSelectedPhones={setSelectedPhones}
            phoneId={phone.id}
            type={ButtonType.HEART}
            likedPhones={likedPhones}
            setLikedPhones={setLikedPhones}
            isActiveBtn={likedPhones.includes(phone.id)}
          />
        </div>
      </div>
    </div>
  );
};
