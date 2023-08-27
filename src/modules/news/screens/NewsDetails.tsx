import { format } from 'date-fns';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

import newsDetailsStyle from '../styles/newsDetails.style';

const NewsDetails = ({ route }) => {
  const { newsItem } = route.params;
  const formattedDate = format(new Date(newsItem.postedAt), 'dd/MM/yyyy');

  return (
    <View style={newsDetailsStyle.container}>
      <ScrollView contentContainerStyle={newsDetailsStyle.scrollContainer}>
        <View style={newsDetailsStyle.imageContainer}>
          <View style={newsDetailsStyle.imageShadow}>
            <Image
              source={{ uri: newsItem.imageUrl }}
              style={newsDetailsStyle.image}
              resizeMode="cover"
            />
          </View>
        </View>
        <Text style={newsDetailsStyle.title}>{newsItem.title}</Text>
        <Text style={newsDetailsStyle.descriptionText}>{newsItem.description}</Text>
        <Text style={newsDetailsStyle.date}>Publicado em: {formattedDate}</Text>
      </ScrollView>
    </View>
  );
};

export default NewsDetails;
