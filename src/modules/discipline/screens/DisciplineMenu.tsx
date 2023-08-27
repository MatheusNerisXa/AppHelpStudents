import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Icon } from '../../../shared/components/icon/Icon';
import { menuStyles } from '../../menu/styles/menu.style';

const DisciplineMenu = () => {
  const navigation = useNavigation();

  const handleListDisciplines = () => {
    navigation.navigate('Discipline');
  };

  const handleCreateDiscipline = () => {
    navigation.navigate('DisciplineCreationScreen');
  };

  return (
    <ScrollView contentContainerStyle={menuStyles.container}>
      <View style={menuStyles.cardRow}>
        <MenuItem
          icon="books"
          text="Listar Matérias"
          color="#827843"
          onPress={handleListDisciplines}
        />
        <MenuItem
          icon="plus"
          text="Cadastrar Matéria"
          color="#2ECC71"
          onPress={handleCreateDiscipline}
        />
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

export default DisciplineMenu;
