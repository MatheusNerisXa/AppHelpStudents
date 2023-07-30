import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Icon } from '../../../shared/components/icon/Icon';
import Text from '../../../shared/components/text/Text';
import { MenuUrl } from '../../../shared/enum/MenuUrl.enum';
import { useRequest } from '../../../shared/hooks/useRequest';
import homeStyle from '../styles/home.style';

type MenuItem = {
  icon: string;
  text: string;
  onPress: () => void;
};

const screenWidth = Dimensions.get('window').width;
const cardSpacing = 5;

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

  const bannerRef = useRef<Animatable.View | null>(null);

  useEffect(() => {
    if (bannerRef.current) {
      bannerRef.current.bounceIn(1500);
    }
  }, []);

  const data: MenuItem[] = [
    { icon: 'books', text: 'Vestibulares', onPress: handleExamPress },
    { icon: 'newspaper', text: 'Notícias', onPress: handleNewsPress },
    { icon: 'question', text: 'Ajuda', onPress: handleSupportPress },
    { icon: 'earth', text: 'Traduções', onPress: handleTranslationPress },
    { icon: 'book', text: 'Matérias', onPress: handleSupportPress },
    { icon: 'checkbox-checked', text: 'Tarefas', onPress: handleTranslationPress },
    { icon: 'book', text: 'Vagas', onPress: handleSupportPress },
    { icon: 'checkbox-checked', text: 'Faltas', onPress: handleTranslationPress },
  ];

  const ITEMS_PER_PAGE = 4;
  const ITEMS_PER_ROW = 2;
  const [activeSlide, setActiveSlide] = useState(0);

  const groupedData = [];
  for (let i = 0; i < data.length; i += ITEMS_PER_PAGE) {
    groupedData.push(data.slice(i, i + ITEMS_PER_PAGE));
  }

  const renderCarouselItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity onPress={item.onPress}>
      <View style={[homeStyle.carouselCardContainer, { marginHorizontal: cardSpacing / 2 }]}>
        <Icon name={item.icon} size={32} color="#007AFF" style={homeStyle.icon} />
        <Text style={homeStyle.carouselCardText}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCarousel = () => {
    return (
      <View style={homeStyle.carouselContainer}>
        <FlatList
          data={groupedData}
          renderItem={({ item }) => (
            <FlatList
              data={item}
              renderItem={renderCarouselItem}
              keyExtractor={(menuItem) => menuItem.text}
              numColumns={ITEMS_PER_ROW}
            />
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const slideWidth = screenWidth;
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
            setActiveSlide(newIndex);
          }}
        />
        <View style={homeStyle.paginationContainer}>
          {groupedData.map((_, index) => (
            <View
              key={`pagination-dot-${index}`}
              style={[homeStyle.paginationDot, index === activeSlide ? homeStyle.activeDot : null]}
            />
          ))}
        </View>
      </View>
    );
  };

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

      {data.length > ITEMS_PER_PAGE && renderCarousel()}
    </ScrollView>
  );
};

export default Home;
