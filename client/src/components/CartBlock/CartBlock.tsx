import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import { CartBlockItem } from './CartBlockItem';
import './CartBlock.scss';
import { CartDialog } from './CartDialog/CartDialog';

type Props = {
  phones: Phone[];
  selectedPhones: number[];
  setSelectedPhones: (value: number[]) => void;
  totalPrice: number;
  setTotalPrice: (value: number) => void;
  countItems: number;
  setCountItems: (value: number) => void;
  setPhoneId: (value: number) => void,
};

export const CartBlock: React.FC<Props> = ({
  phones,
  selectedPhones,
  setSelectedPhones,
  totalPrice,
  setTotalPrice,
  countItems,
  setCountItems,
  setPhoneId,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const visiblePhones = phones.filter(phone => (
    selectedPhones.includes(phone.id)
  ));

  const initialTotalPrice = visiblePhones
    .map(phone => (phone.price * +window.localStorage.getItem(`item:${phone.id}`)!))
    .reduce((sum, value) => sum + value, 0);

  const initialItemsCount = visiblePhones
    .map(phone => (1 * +window.localStorage.getItem(`item:${phone.id}`)!))
    .reduce((sum, value) => sum + value, 0);

  useEffect(() => {
    if (totalPrice === 0) {
      setTotalPrice(initialTotalPrice);
      setCountItems(initialItemsCount);
    }
  }, [initialTotalPrice]);

  useEffect(() => {
    const dataTotalPrice = window.localStorage.getItem('Total Price');

    if (dataTotalPrice !== null) {
      setTotalPrice(JSON.parse(dataTotalPrice));
    }

    const dataTotalCount = window.localStorage.getItem('Items Count');

    if (dataTotalCount !== null) {
      setCountItems(JSON.parse(dataTotalCount));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('Total Price', JSON.stringify(totalPrice));
    window.localStorage.setItem('Items Count', JSON.stringify(countItems));
  }, [totalPrice]);

  const navigate = useNavigate();

  return (
    <div className="cart__block grid container">
      <div
        className="cart__block-links
        grid__item--mobile-1-2
        grid__item--iPad-1-2
        grid__item--desktop-1-2"
      >
        <Link to="/" className="cart__block-vector" />
        <button
          type="submit"
          className="cart__block-link"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      <div className="cart__block-title
        grid__item--mobile-1-3
        grid__item--iPad-1-3
        grid__item--desktop-1-3"
      >
        Cart
      </div>

      <div
        className="grid__item--mobile-1-4
        grid__item--iPad-1-12
        grid__item--desktop-1-16"
      >
        {visiblePhones.map(phone => (
          <CartBlockItem
            key={phone.id}
            phone={phone}
            setSelectedPhones={setSelectedPhones}
            selectedPhones={selectedPhones}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
            countItems={countItems}
            setCountItems={setCountItems}
            setPhoneId={setPhoneId}
          />
        ))}
      </div>
      <div className="cart__block-total
        grid__item--mobile-1-4
        grid__item--iPad-1-12
        grid__item--desktop-17-24"
      >
        <div className="cart__block-total-title">{`$${totalPrice}`}</div>
        <div className="cart__block-total-subtitle">{`Total for ${countItems} items`}</div>
        <button
          type="submit"
          className="cart__block-total-button"
          onClick={handleOpen}
        >
          Checkout
        </button>
      </div>

      <CartDialog open={open} handleClose={handleClose} />
    </div>
  );
};
