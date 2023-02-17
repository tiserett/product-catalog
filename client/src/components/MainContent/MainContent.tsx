import { useState, useEffect } from 'react'; //
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  NotFoundPage,
  Tablets,
  Accessories,
} from '../../pages';
import { PhonesList } from '../ProductList/ProductList';
import { Phone } from '../../types/Phone';
import { CartBlock } from '../CartBlock';
import { PhoneInfo } from '../phoneInfo';
import { Favourites } from '../Favourites';
import { HomePage } from '../HomePage/HomePage';
import './MainContent.scss';

type Props = {
  phones: Phone[];
};

export const Main: React.FC<Props> = ({ phones }) => {
  const [selectedPhones, setSelectedPhones] = useState<number[]>([]);
  const [likedPhones, setLikedPhones] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [countItems, setCountItems] = useState(0);
  const [phoneId, setPhoneId] = useState(1);

  const visiblePhones = phones.filter(phone => (
    selectedPhones.includes(phone.id)
  ));

  const initialTotalPrice = visiblePhones
    .map(phone => phone.price * (+window.localStorage.getItem(`item:${phone.id}`)! || 1))
    .reduce((sum, value) => sum + value, 0);

  const initialItemsCount = visiblePhones
    .map(phone => 1 * (+window.localStorage.getItem(`item:${phone.id}`)! || 1))
    .reduce((sum, value) => sum + value, 0);

  useEffect(() => {
    const dataPhones = window.localStorage.getItem('Phones');
    const dataLiked = window.localStorage.getItem('LikedPhones');

    if (dataPhones !== null) {
      setSelectedPhones(JSON.parse(dataPhones));
    }

    if (dataLiked !== null) {
      setLikedPhones(JSON.parse(dataLiked));
    }
  }, []);

  useEffect(() => {
    window.localStorage
      .setItem('Phones', JSON.stringify(selectedPhones));
    window.localStorage
      .setItem('Total Price', JSON.stringify(initialTotalPrice));
    window.localStorage
      .setItem('Items Count', JSON.stringify(initialItemsCount));
    setTotalPrice(initialTotalPrice);
  }, [selectedPhones]);

  useEffect(() => {
    window.localStorage.setItem('LikedPhones', JSON.stringify(likedPhones));
  }, [likedPhones]);

  return (
    <div className="mainContent">
      <Routes>
        <Route
          path="Home"
          element={(
            <HomePage
              phones={phones}
              selectedPhones={selectedPhones}
              setSelectedPhones={setSelectedPhones}
              setPhoneId={setPhoneId}
              likedPhones={likedPhones}
              setLikedPhones={setLikedPhones}
            />
          )}
        />
        <Route path="/" element={<Navigate to="Home" replace />} />

        <Route path="phones">
          <Route
            index
            element={(
              <PhonesList
                phones={phones}
                selectedPhones={selectedPhones}
                setSelectedPhones={setSelectedPhones}
                setPhoneId={setPhoneId}
                likedPhones={likedPhones}
                setLikedPhones={setLikedPhones}
              />
            )}
          />
          <Route
            path=":phoneId"
            element={(
              <PhoneInfo
                phoneId={phoneId}
                selectedPhones={selectedPhones}
                setSelectedPhones={setSelectedPhones}
                likedPhones={likedPhones}
                setLikedPhones={setLikedPhones}
                setPhoneId={setPhoneId}
              />
            )}
          />
        </Route>

        <Route path="tablets" element={<Tablets />} />
        <Route path="accessories" element={<Accessories />} />

        <Route
          path="shopping"
          element={(
            <CartBlock
              phones={phones}
              selectedPhones={selectedPhones}
              setSelectedPhones={setSelectedPhones}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              countItems={countItems}
              setCountItems={setCountItems}
              setPhoneId={setPhoneId}
            />
          )}
        />
        <Route
          path="favourites"
          element={(
            <Favourites
              phones={phones}
              likedPhones={likedPhones}
              setLikedPhones={setLikedPhones}
              setPhoneId={setPhoneId}
              selectedPhones={selectedPhones}
              setSelectedPhones={setSelectedPhones}
            />
          )}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
