import React, { useEffect, useRef } from 'react';
import { Image, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';

import homeStyle from '../styles/home.style';

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bannerRef = useRef<Animatable.View | number | undefined | any>(null);

  useEffect(() => {
    if (bannerRef.current) {
      bannerRef.current.bounceIn(1500);
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={homeStyle.container}>
      <Animatable.View ref={bannerRef} style={homeStyle.bannerContainer}>
        <Image
          source={{
            uri: 'https://helpstudent.s3.amazonaws.com/banners/Apresentac%CC%A7a%CC%83o+Empresarial+Boas+Vindas+Esta%CC%81gio.jpg',
          }}
          style={homeStyle.bannerImage}
          resizeMode="cover"
        />
      </Animatable.View>
    </ScrollView>
  );
};

export default Home;
