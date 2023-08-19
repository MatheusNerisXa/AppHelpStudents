import React, { useEffect, useRef } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { useRequest } from '../../../shared/hooks/useRequest';
import homeStyle from '../styles/home.style';

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bannerRef = useRef<Animatable.View | number | undefined | any>(null);
  const { user } = useRequest();
  const userName = user?.name;
  useEffect(() => {
    if (bannerRef.current) {
      bannerRef.current.bounceIn(1500);
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={homeStyle.container}>
      <View style={homeStyle.headerContainer}>
        <Text style={homeStyle.greetingText}>Olá,</Text>
        <Text style={homeStyle.userName}>{userName}!</Text>
      </View>
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
