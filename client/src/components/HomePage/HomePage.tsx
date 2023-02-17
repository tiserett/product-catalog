import { useEffect, useState } from 'react';
import axios from 'axios';
import { Phone } from '../../types/Phone';
import { Loader } from '../Loader';
import { HeroSection } from '../HeroSection';
import { ModelsSection } from '../ModelsSection';
import { HotPricesSection } from '../HotPricesSection';
import { CategorySection } from '../CategorySection';
import './HomePage.scss';

type Props = {
  phones: Phone[];
  selectedPhones: number[];
  setSelectedPhones: (value: number[]) => void;
  setPhoneId: (value: number) => void;
  size?: boolean;
  likedPhones: number[];
  setLikedPhones: (value: number[]) => void;
};

export const HomePage: React.FC<Props> = ({
  phones,
  selectedPhones,
  setSelectedPhones,
  setPhoneId,
  likedPhones,
  setLikedPhones,
}) => {
  const [newModels, setNewModels] = useState<Phone[]>([]);
  const [cheapModels, setCheapModels] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = 'https://product-server.onrender.com/products';

  useEffect(() => {
    const loadData = async () => {
      const newRes = await axios.get(`${baseUrl}/new`);
      const discountRes = await axios.get(`${baseUrl}/discount`);

      const newData = await newRes.data;
      const discountData = await discountRes.data;

      setNewModels(newData);
      setCheapModels(discountData);
    };

    try {
      loadData();
    } catch {
      setNewModels([]);
      setCheapModels([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return isLoading ? <Loader /> : (
    <>
      <HeroSection />

      <ModelsSection
        phones={newModels}
        selectedPhones={selectedPhones}
        setSelectedPhones={setSelectedPhones}
        setPhoneId={setPhoneId}
        likedPhones={likedPhones}
        setLikedPhones={setLikedPhones}
      />

      <CategorySection phones={phones} />

      <HotPricesSection
        phones={cheapModels}
        selectedPhones={selectedPhones}
        setSelectedPhones={setSelectedPhones}
        setPhoneId={setPhoneId}
        likedPhones={likedPhones}
        setLikedPhones={setLikedPhones}
      />
    </>
  );
};
