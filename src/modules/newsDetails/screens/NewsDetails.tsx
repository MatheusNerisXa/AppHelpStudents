import React from 'react';
import { Image, ScrollView, Text } from 'react-native';

import newsDetailsStyle from '../styles/newsDetails.style';

const NewsDetailsScreen = ({ route }) => {
  const { newsItem } = route.params;

  return (
    <ScrollView contentContainerStyle={newsDetailsStyle.container}>
      <Image
        source={{ uri: newsItem.imageUrl }}
        style={newsDetailsStyle.image}
        resizeMode="cover"
      />
      <Text style={newsDetailsStyle.title}>{newsItem.title}</Text>
      <Text style={newsDetailsStyle.descriptionText}>{newsItem.description}</Text>
    </ScrollView>
  );
};

export default NewsDetailsScreen;
