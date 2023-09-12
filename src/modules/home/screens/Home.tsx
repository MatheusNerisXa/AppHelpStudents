import React, { useEffect, useState } from 'react';
import { ImageBackground, View } from 'react-native';

import { URL_BANNERS } from '../../../shared/constants/urls';
// import { useRequest } from '../../../shared/hooks/useRequest';
import homeStyle from '../styles/home.style';

interface Banner {
  id: number;
  url_image: string;
  status: number;
}

const Home: React.FC = () => {
  // const { user } = useRequest();
  // const [userName, setUserName] = useState<string | undefined>(user?.name);

  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const response = await fetch(URL_BANNERS);
        const data = await response.json();

        setBanners(data);
      } catch (error) {
        console.error('Erro ao buscar banners:', error);
      }
    }

    fetchBanners();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  const currentBanner = banners[currentIndex];

  return (
    <View style={homeStyle.container}>
      {currentBanner && (
        <View style={homeStyle.bannerContainer}>
          <ImageBackground
            source={{ uri: currentBanner.url_image }}
            style={homeStyle.bannerImage}
          />
        </View>
      )}
      <View style={homeStyle.dotsContainer}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              homeStyle.dot,
              // eslint-disable-next-line react-native/no-inline-styles
              { backgroundColor: index === currentIndex ? '#f907c7' : '#253494' },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default Home;
