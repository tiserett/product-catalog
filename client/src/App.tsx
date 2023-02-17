import axios from 'axios'; //
import { useEffect, useState } from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Main } from './components/MainContent/MainContent';
import { Phone } from './types/Phone';

export const App = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    const loadPhones = async () => {
      const response = await axios.get(
        'https://product-catalog-vr26.onrender.com/products',
      );

      const data = await response.data;

      setPhones(data);
    };

    try {
      loadPhones();
    } catch {
      setPhones([]);
    }
  }, []);

  return (
    <div>
      <Header />
      <Main phones={phones} />
      <Footer />
    </div>
  );
};
