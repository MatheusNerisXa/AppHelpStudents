import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Icon } from '../../../shared/components/icon/Icon';
import Text from '../../../shared/components/text/Text';
import { MenuUrl } from '../../../shared/enum/MenuUrl.enum';
import homeStyle from '../styles/home.style';

const Home = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleExamPress = () => {
    navigation.navigate(MenuUrl.Exam);
  };

  const handleNewsPress = () => {
    navigation.navigate(MenuUrl.News);
  };

  return (
    <View style={homeStyle.container}>
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
      </View>
      <View style={homeStyle.cardRow}>
        <TouchableOpacity style={homeStyle.cardContainer} onPress={handleExamPress}>
          <View style={homeStyle.iconContainer}>
            <Icon name="books" size={24} color="#007AFF" style={homeStyle.icon} />
          </View>
          <Text style={homeStyle.cardText}>Vestibulares</Text>
        </TouchableOpacity>
        <TouchableOpacity style={homeStyle.cardContainer} onPress={handleExamPress}>
          <View style={homeStyle.iconContainer}>
            <Icon name="books" size={24} color="#007AFF" style={homeStyle.icon} />
          </View>
          <Text style={homeStyle.cardText}>Vestibulares</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
