import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { Icon } from '../../../shared/components/icon/Icon';
import Text from '../../../shared/components/text/Text';
import { MenuUrl } from '../../../shared/enum/MenuUrl.enum';
import { useRequest } from '../../../shared/hooks/useRequest';
import homeStyle from '../styles/home.style';

const Home = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const { user } = useRequest();

  const userName = user?.name || 'Guest';

  const handleExamPress = () => {
    navigation.navigate(MenuUrl.Exam);
  };

  const handleNewsPress = () => {
    navigation.navigate(MenuUrl.News);
  };

  const handleSuportPress = () => {
    navigation.navigate(MenuUrl.Suport);
  };

  const handleTranslationPress = () => {
    navigation.navigate(MenuUrl.Translation);
  };

  return (
    <ScrollView contentContainerStyle={homeStyle.container}>
      <View style={homeStyle.greetingContainer}>
        <Text style={homeStyle.greetingText}>Olá,</Text>
        <View style={homeStyle.userNameContainer}>
          <Text style={homeStyle.userName}>{userName}!</Text>
        </View>
      </View>

      <View style={homeStyle.cardsContainer}>
        <View style={homeStyle.cardRow}>
          <TouchableOpacity style={homeStyle.cardContainer} onPress={handleExamPress}>
            <View style={homeStyle.iconContainer}>
              <Icon name="books" size={24} color="#007AFF" style={homeStyle.icon} />
            </View>
            <Text style={homeStyle.cardText}>Vestibulares</Text>
          </TouchableOpacity>
          <TouchableOpacity style={homeStyle.cardContainer} onPress={handleNewsPress}>
            <View style={homeStyle.iconContainer}>
              <Icon name="newspaper" size={24} color="#007AFF" style={homeStyle.icon} />
            </View>
            <Text style={homeStyle.cardText}>Notícias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={homeStyle.cardContainer} onPress={handleSuportPress}>
            <View style={homeStyle.iconContainer}>
              <Icon name="question" size={24} color="#007AFF" style={homeStyle.icon} />
            </View>
            <Text style={homeStyle.cardText}>Ajuda</Text>
          </TouchableOpacity>
        </View>
        <View style={homeStyle.cardRow}>
          <TouchableOpacity style={homeStyle.cardContainer} onPress={handleTranslationPress}>
            <View style={homeStyle.iconContainer}>
              <Icon name="earth" size={24} color="#007AFF" style={homeStyle.icon} />
            </View>
            <Text style={homeStyle.cardText}>Traduções</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
