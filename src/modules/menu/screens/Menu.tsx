import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Icon } from '../../../shared/components/icon/Icon';
import { MenuUrl } from '../../../shared/enum/MenuUrl.enum';
import { logout } from '../../../shared/functions/connection/auth';
import { menuStyles } from '../styles/menu.style';

const Menu = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

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
      <View style={menuStyles.cardRow}>
        <MenuItem icon="books" text="Vestibulares" color="#F05454" onPress={handleExamPress} />
        <MenuItem icon="newspaper" text="Notícias" color="#3498DB" onPress={handleNewsPress} />
      </View>
      <View style={menuStyles.cardRow}>
        <MenuItem icon="book" text="Matérias" color="#827843" onPress={handleDisciplinePress} />
        <MenuItem
          icon="earth"
          text="Help Tradutor"
          color="#2ECC71"
          onPress={handleTranslationPress}
        />
      </View>
      <View style={menuStyles.cardRow}>
        <MenuItem icon="question" text="Ajuda" color="#007AFF" onPress={handleSupportPress} />
        <MenuItem icon="user" text="Perfil" color="#FFA500" onPress={handleProfilePress} />
      </View>
      <View style={menuStyles.cardRow}>
        <MenuItem
          icon="checkbox-checked"
          text="Tarefas"
          color="#F2994A"
          onPress={handleSupportPress}
        />
        <MenuItem icon="exit" text="Sair" color="#FF5733" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};

const MenuItem = ({ onPress, icon, text, color }) => (
  <TouchableOpacity onPress={onPress}>
    <Animatable.View
      animation="fadeInLeft"
      duration={1000}
      style={[menuStyles.cardContainer, { backgroundColor: color }]}
    >
      <Icon name={icon} size={32} color="#FFF" style={menuStyles.icon} />
      <Text style={menuStyles.cardText}>{text}</Text>
    </Animatable.View>
  </TouchableOpacity>
);

export default Menu;
