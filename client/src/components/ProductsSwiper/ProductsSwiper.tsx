import {
  Navigation,
  Pagination,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PhonesListItem } from '../ProductList/ProductListItem';
import 'swiper/css/navigation';
import './ProductsSwiper.scss';
import { Phone } from '../../types/Phone';

type Props = {
  phones: Phone[];
  selectedPhones: number[];
  setSelectedPhones: (value: number[]) => void;
  setPhoneId: (value: number) => void;
  likedPhones: number[];
  setLikedPhones: (value: number[]) => void;
  title: string;
};

export const ProductsSwiper: React.FC<Props> = ({
  phones,
  selectedPhones,
  setSelectedPhones,
  setPhoneId,
  likedPhones,
  setLikedPhones,
  title,
}) => (
  <div className="product-slider">
    <h2 className="title product-slider__title">
      {title}
    </h2>

    <Swiper
      slidesPerView="auto"
      spaceBetween={16}
      loop
      loopFillGroupWithBlank
      navigation
      modules={[Pagination, Navigation]}
      breakpoints={{
        1200: { slidesPerView: 4 },
        1150: { slidesPerView: 4.5 },
        1024: { slidesPerView: 4.1 },
        900: { slidesPerView: 3.5 },
        768: { slidesPerView: 2.9 },
        580: { slidesPerView: 2.5 },
        500: { slidesPerView: 2.2 },
        420: { slidesPerView: 1.9 },
        375: { slidesPerView: 1.6 },
        320: { slidesPerView: 1.4 },
      }}
    >
      {phones.map(phone => (
        <SwiperSlide>
          <PhonesListItem
            key={phone.id}
            phone={phone}
            selectedPhones={selectedPhones}
            setSelectedPhones={setSelectedPhones}
            setPhoneId={setPhoneId}
            likedPhones={likedPhones}
            setLikedPhones={setLikedPhones}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);
