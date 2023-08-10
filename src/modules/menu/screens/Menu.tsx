import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Icon } from '../../../shared/components/icon/Icon';
import Text from '../../../shared/components/text/Text';
import { MenuUrl } from '../../../shared/enum/MenuUrl.enum';
import { logout } from '../../../shared/functions/connection/auth';
import { useRequest } from '../../../shared/hooks/useRequest';
import { menuStyles } from '../styles/menu.style';

const Menu = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { user } = useRequest();
  const userName = user?.name;

  const handleLogout = () => {
    Alert.alert(
      'Confirmar saída',
      'Deseja realmente sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            logout(navigation);
          },
        },
      ],
      { cancelable: true },
    );
  };

  const handleExamPress = () => {
    navigation.navigate(MenuUrl.Exam);
  };

  const handleProfilePress = () => {
    navigation.navigate(MenuUrl.Profile);
  };

  const handleSupportPress = () => {
    navigation.navigate(MenuUrl.Suport);
  };

  const handleDisciplinePress = () => {
    navigation.navigate(MenuUrl.Discipline);
  };
  const handleTranslationPress = () => {
    navigation.navigate(MenuUrl.Translation);
  };

  const handleNewsPress = () => {
    navigation.navigate(MenuUrl.News);
  };

  return (
    <ScrollView contentContainerStyle={menuStyles.container}>
      <View style={menuStyles.headerContainer}>
        <Text style={menuStyles.greetingText}>Olá,</Text>
        <Text style={menuStyles.userName}>{userName}!</Text>
      </View>

      <View style={menuStyles.cardRow}>
        <TouchableOpacity onPress={handleExamPress}>
          <Animatable.View animation="fadeInLeft" duration={1000} style={menuStyles.cardContainer}>
            <Icon name="books" size={32} color="#F05454" style={menuStyles.icon} />
            <Text style={menuStyles.cardText}>Vestibulares</Text>
          </Animatable.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNewsPress}>
          <Animatable.View animation="fadeInRight" duration={1000} style={menuStyles.cardContainer}>
            <Icon name="newspaper" size={32} color="#3498DB" style={menuStyles.icon} />
            <Text style={menuStyles.cardText}>Notícias</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>

      <View style={menuStyles.cardRow}>
        <TouchableOpacity onPress={handleDisciplinePress}>
          <Animatable.View animation="fadeInLeft" duration={1000} style={menuStyles.cardContainer}>
            <Icon name="book" size={32} color="#827843" style={menuStyles.icon} />
            <Text style={menuStyles.cardText}>Matérias</Text>
          </Animatable.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleTranslationPress}>
          <Animatable.View animation="fadeInRight" duration={1000} style={menuStyles.cardContainer}>
            <Icon name="earth" size={32} color="#2ECC71" style={menuStyles.icon} />
            <Text style={menuStyles.cardText}>Help Tradutor</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>

      <View style={menuStyles.cardRow}>
        <TouchableOpacity onPress={handleSupportPress}>
          <Animatable.View animation="fadeInLeft" duration={1000} style={menuStyles.cardContainer}>
            <Icon name="question" size={32} color="#007AFF" style={menuStyles.icon} />
            <Text style={menuStyles.cardText}>Ajuda</Text>
          </Animatable.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleProfilePress}>
          <Animatable.View animation="fadeInRight" duration={1000} style={menuStyles.cardContainer}>
            <Icon name="user" size={32} color="#FFA500" style={menuStyles.icon} />
            <Text style={menuStyles.cardText}>Perfil</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>

      <View style={menuStyles.cardRow}>
        <TouchableOpacity onPress={handleSupportPress}>
          <Animatable.View animation="fadeInLeft" duration={1000} style={menuStyles.cardContainer}>
            <Icon name="checkbox-checked" size={32} color="#F2994A" style={menuStyles.icon} />
            <Text style={menuStyles.cardText}>Tarefas</Text>
          </Animatable.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <Animatable.View animation="fadeInRight" duration={1000} style={menuStyles.cardContainer}>
            <Icon name="exit" size={32} color="#FF5733" style={menuStyles.icon} />
            <Text style={menuStyles.cardText}>Sair</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Menu;
