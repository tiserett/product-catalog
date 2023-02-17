import { Link, useNavigate } from 'react-router-dom'; //
import classNames from 'classnames';
import './phoneInfo.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PhoneType } from '../../types/PhoneType';
import { Button } from '../Button';
import {
  ButtonClassModifier,
  ButtonClassType,
  ButtonType,
} from '../../enums/ButtonEnum';
import { ProductsSwiper } from '../ProductsSwiper';
import { Phone } from '../../types/Phone';

type Props = {
  phoneId: number;
  setSelectedPhones: (value: number[]) => void;
  selectedPhones: number[];
  likedPhones: number[];
  setLikedPhones: (value: number[]) => void;
  setPhoneId: (value: number) => void;
};

export const PhoneInfo: React.FC<Props> = ({
  phoneId,
  setSelectedPhones,
  selectedPhones,
  likedPhones,
  setLikedPhones,
  setPhoneId,
}) => {
  const [foundPhone, setFoundPhone] = useState<PhoneType | null>(null);
  const [suggestedPhones, setSuggestedPhones] = useState<Phone[]>([]);
  const [imageCart, setImageCart] = useState(foundPhone?.images);
  const navigate = useNavigate();

  const baseUrl = 'https://product-catalog-vr26.onrender.com/products';

  useEffect(() => {
    const loadData = async () => {
      const id = window.location.href.split('/Phones/')[1];

      const suggestedRes = await axios.get(`${baseUrl}/new`);
      const suggestedData = await suggestedRes.data;

      const phoneRes = await axios.get(`${baseUrl}/${id}`);
      const phoneData = await phoneRes.data;

      setFoundPhone(phoneData);
      setSuggestedPhones(suggestedData);
    };

    try {
      loadData();
    } catch {
      setFoundPhone(null);
    }
  }, []);

  if (!foundPhone) {
    return <h2>404</h2>;
  }

  return (
    <main className="phone">
      <div className="container">
        <div className="phone-info">
          <div className="phone-info__logo">
            <Link to="/" className="phone-info__logo-home" />
            <Link to="/" className="phone-info__logo-vector" />
            <Link
              to="/Phones"
              className="phone-info__logo-link"
            >
              Phones
            </Link>
            <Link to="/" className="phone-info__logo-vector" />
            <p className="phone-info__logo-text">
              {foundPhone.name}
            </p>
          </div>
          <div className="back__btn">
            <Link
              to="/Phones"
              className="back__btn-vector"
            />
            <button
              type="submit"
              className="back__btn-link"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>
        <div>
          <h1 className="phone__title h1">
            {foundPhone.name}
          </h1>
          <div className="phone__wrapper">
            <div className="phone__list">
              <div className="image__container">
                {foundPhone.images.map(image => (
                  /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
                  <img
                    src={`http://localhost:8080/${image}`}
                    key={image}
                    onClick={() => setImageCart([image])}
                    className={classNames('phone__item', {
                      'phone__item--focus': imageCart?.includes(image),
                    })}
                    alt="imageCart"
                  />
                ))}
              </div>
              <img
                src={`http://localhost:8080/${imageCart ? imageCart[0] : foundPhone.images[0]}`}
                alt="phone"
                className="phone__image"
              />
            </div>
            <div className="phone__functional">
              <p className="phone__chose-color-text">
                Avaliable colors
              </p>
              <div className="phone__chose-color">
                <div className="phone__chose-color-list">
                  {foundPhone.colorsAvailable.map(color => (
                    <div
                      key={color}
                      className={classNames('phone__chose-color-item', {
                        // eslint-disable-next-line max-len
                        'phone__chose-color-item--focus': color === foundPhone.color,
                      })}
                    >
                      <button
                        type="button"
                        className="phone__chose-color-btn"
                        style={{ backgroundColor: color }}
                        aria-label="color"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="phone__line--min" />
              <p
                className="phone__chose-color-text"
              >
                Select capacity
              </p>
              <div className="phone__chose-capacity">
                <div className="phone__chose-capacity-list">
                  {foundPhone.capacityAvailable.map(capacity => (
                    <div
                      key={capacity}
                      className={classNames('phone__chose-capacity-item', {
                        // eslint-disable-next-line max-len
                        'phone__chose-capacity-item--focus': capacity === foundPhone.capacity,
                      })}
                    >
                      <button
                        type="button"
                        className="phone__chose-capacity-btn"
                        aria-label="capacity"
                      >
                        {capacity}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="phone__price">
                <p className="phone__newPrice">
                  $
                  {foundPhone.priceDiscount}
                </p>
                <p className="phone__oldPrice">
                  $
                  {foundPhone.priceRegular}
                </p>
              </div>
              <div className="phone__button">
                {selectedPhones.includes(phoneId)
                  ? (
                    <Button
                      title="Added to cart"
                      btnClassType={ButtonClassType.PRIMARY}
                      btnClassModifier={ButtonClassModifier.ADDED}
                      selectedPhones={selectedPhones}
                      setSelectedPhones={setSelectedPhones}
                      phoneId={phoneId}
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
                      phoneId={phoneId}
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
                  phoneId={phoneId}
                  type={ButtonType.HEART}
                  likedPhones={likedPhones}
                  setLikedPhones={setLikedPhones}
                  isActiveBtn={likedPhones.includes(phoneId)}
                />
              </div>
              <div className="phone__characteristic smalltext">
                <p className="phone__name">Screen</p>
                <p className="phone__value">
                  {foundPhone.screen}
                </p>
              </div>
              <div className="phone__characteristic smalltext">
                <p className="phone__name">Resolution</p>
                <p className="phone__value">
                  {foundPhone.resolution}
                </p>
              </div>
              <div className="phone__characteristic smalltext">
                <p className="phone__name">Processor</p>
                <p className="phone__value">
                  {foundPhone.processor}
                </p>
              </div>
              <div className="phone__characteristic smalltext">
                <p className="phone__name">RAM</p>
                <p className="phone__value">
                  {foundPhone.ram}
                </p>
              </div>
            </div>
          </div>
          <div className="phone__content">
            <div className="phone__about">
              <h2 className="phone__subtitle h2">About</h2>
              <div className="phone__line" />
              <div className="phone__about--text ">
                {foundPhone.description.map(text => (
                  <div>
                    <p
                      className="phone__about--title"
                    >
                      {text.title}
                    </p>
                    <p
                      className="phone__about--text"
                    >
                      {text.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="phone__specs">
              <h2 className="phone__subtitle h2">Tech specs</h2>
              <div className="phone__line--middle cart__specs--line" />
              <div className="phone__characteristic smalltext">
                <p className="phone__name">Screen</p>
                <p className="phone__value">
                  {foundPhone.screen}
                </p>
              </div>
              <div className="phone__characteristic smalltext">
                <p className="phone__name">Resolution</p>
                <p className="phone__value">
                  {foundPhone.resolution}
                </p>
              </div>
              <div className="phone__characteristic smalltext">
                <p className="phone__name">Processor</p>
                <p className="phone__value">
                  {foundPhone.processor}
                </p>
              </div>
              <div className="phone__characteristic smalltext">
                <p className="phone__name">RAM</p>
                <p className="phone__value">
                  {foundPhone.ram}
                </p>
              </div>
              <div className="phone__characteristic smalltext">
                <p className="phone__name">Built in memory</p>
                <p className="phone__value">
                  {foundPhone.capacity}
                </p>
              </div>
              <div className="phone__characteristic smalltext">
                <p className="phone__name">Camera</p>
                <p className="phone__value">
                  {foundPhone.camera}
                </p>
              </div>
              <div className="phone__characteristic smalltext">
                <p className="phone__name">Zoom</p>
                <p className="phone__value">
                  {foundPhone.zoom}
                </p>
              </div>
              <div className="phone__characteristic smalltext">
                <p className="phone__name">Ceil</p>
                <p className="phone__value">
                  {foundPhone.cell.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductsSwiper
        phones={suggestedPhones}
        selectedPhones={selectedPhones}
        setSelectedPhones={setSelectedPhones}
        setPhoneId={setPhoneId}
        likedPhones={likedPhones}
        setLikedPhones={setLikedPhones}
        title="You may also like"
      />
    </main>
  );
};
