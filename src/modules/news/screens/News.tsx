import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { URL_NEWS } from '../../../shared/constants/urls';
import newsStyle from '../styles/news.style';

interface News {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  postedAt: string;
}

const NewsItem = ({ news }: { news: News }) => {
  const formatBrazilianDate = (date: string) => {
    return format(parseISO(date), 'dd/MM/yyyy');
  };

  const navigation = useNavigation();

  const handleNewsPress = () => {
    navigation.navigate('NewsDetails', { newsItem: news });
  };

  return (
    <TouchableOpacity style={newsStyle.listItem} onPress={handleNewsPress}>
      <ImageBackground
        source={{ uri: news.imageUrl }}
        style={newsStyle.newsImageContainer}
        resizeMode="cover"
      />
      <View style={newsStyle.textContainer}>
        <Text style={newsStyle.title}>{news.title}</Text>
        <Text style={newsStyle.postedAtText}>
          Publicado em: {formatBrazilianDate(news.postedAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const NewsComponent = () => {
  const [news, setNews] = useState<News[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');

  const fetchData = () => {
    fetch(URL_NEWS)
      .then((response) => response.json())
      .then((data) => setNews(data))
      .finally(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const filteredNews = news.filter((newsItem) =>
    newsItem.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderNews = () => {
    if (filteredNews.length === 0 && searchText.length > 0) {
      return (
        <View style={newsStyle.emptyContainer}>
          <Text>Nenhuma notícia encontrada com o título "{searchText}"</Text>
        </View>
      );
    }

    return filteredNews.map((newsItem) => <NewsItem key={newsItem.id} news={newsItem} />);
  };

  return (
    <View style={newsStyle.container}>
      <View style={newsStyle.searchContainer}>
        <TextInput
          style={newsStyle.searchInput}
          placeholder="Digite o título da notícia"
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={handleSearch}
          autoFocus={false}
        />
      </View>
      <ScrollView
        contentContainerStyle={newsStyle.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#253494" />
        }
      >
        {renderNews()}
      </ScrollView>
    </View>
  );
};

export default NewsComponent;
