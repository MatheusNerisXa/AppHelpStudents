import React from 'react';
import { Text, View } from 'react-native';

import newsDetailsStyle from '../styles/newsDetails.style';

const NewsDetailsScreen = ({ route }) => {
  const { newsItem } = route.params;

  return (
    <View style={newsDetailsStyle.container}>
      <Text style={newsDetailsStyle.title}>{newsItem.title}</Text>
      <Text style={newsDetailsStyle.descriptionText}>{newsItem.description}</Text>
    </View>
  );
};

export default NewsDetailsScreen;
