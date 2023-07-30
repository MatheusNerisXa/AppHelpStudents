import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Icon } from '../../../shared/components/icon/Icon';
import Text from '../../../shared/components/text/Text';
import { MenuUrl } from '../../../shared/enum/MenuUrl.enum';
import { useRequest } from '../../../shared/hooks/useRequest';
import homeStyle from '../styles/home.style';

const Home = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const { user } = useRequest();
  const userName = user?.name;

  const handleExamPress = () => {
    navigation.navigate(MenuUrl.Exam);
  };

  const handleNewsPress = () => {
    navigation.navigate(MenuUrl.News);
  };

  const handleSupportPress = () => {
    navigation.navigate(MenuUrl.Suport);
  };

  const handleTranslationPress = () => {
    navigation.navigate(MenuUrl.Translation);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bannerRef = useRef<Animatable.View | number | undefined | any>(null);

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

      <View style={homeStyle.cardRow}>
        <TouchableOpacity onPress={handleExamPress}>
          <Animatable.View animation="fadeInLeft" duration={1000} style={homeStyle.cardContainer}>
            <Icon name="books" size={32} color="#007AFF" style={homeStyle.icon} />
            <Text style={homeStyle.cardText}>Vestibulares</Text>
          </Animatable.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNewsPress}>
          <Animatable.View animation="fadeInRight" duration={1000} style={homeStyle.cardContainer}>
            <Icon name="newspaper" size={32} color="#007AFF" style={homeStyle.icon} />
            <Text style={homeStyle.cardText}>Notícias</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>

      <View style={homeStyle.cardRow}>
        <TouchableOpacity onPress={handleSupportPress}>
          <Animatable.View animation="fadeInLeft" duration={1000} style={homeStyle.cardContainer}>
            <Icon name="question" size={32} color="#007AFF" style={homeStyle.icon} />
            <Text style={homeStyle.cardText}>Ajuda</Text>
          </Animatable.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleTranslationPress}>
          <Animatable.View animation="fadeInRight" duration={1000} style={homeStyle.cardContainer}>
            <Icon name="earth" size={32} color="#007AFF" style={homeStyle.icon} />
            <Text style={homeStyle.cardText}>Traduções</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>

      <View style={homeStyle.cardRow}>
        <TouchableOpacity onPress={handleSupportPress}>
          <Animatable.View animation="fadeInLeft" duration={1000} style={homeStyle.cardContainer}>
            <Icon name="question" size={32} color="#007AFF" style={homeStyle.icon} />
            <Text style={homeStyle.cardText}>Ajuda</Text>
          </Animatable.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleTranslationPress}>
          <Animatable.View animation="fadeInRight" duration={1000} style={homeStyle.cardContainer}>
            <Icon name="earth" size={32} color="#007AFF" style={homeStyle.icon} />
            <Text style={homeStyle.cardText}>Traduções</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>

      <Animatable.View ref={bannerRef} style={homeStyle.bannerContainer}>
        <Image
          source={{ uri: 'https://helpstudent.s3.amazonaws.com/noticias/imagens/2020-03-02.jpg' }}
          style={homeStyle.bannerImage}
          resizeMode="cover"
        />
      </Animatable.View>
    </ScrollView>
  );
};

export default Home;
