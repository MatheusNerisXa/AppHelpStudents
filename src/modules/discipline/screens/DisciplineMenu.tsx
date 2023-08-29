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
          icon="plus"
          text="Adicionar Matéria"
          color="#3498db" // Azul
          onPress={handleCreateDiscipline}
        />
        <MenuItem
          icon="book"
          text="Ver Matérias"
          color="#9b59b6" // Roxo
          onPress={handleListDisciplines}
        />
      </View>
      <View style={menuStyles.cardRow}>
        <MenuItem
          icon="stats-dots"
          text="Relatórios"
          color="#27ae60" // Vermelho
          onPress={handleListDisciplines}
        />
        <MenuItem
          icon="checkbox-checked"
          text="Atividades"
          color="#f39c12" // Verde
          onPress={handleCreateDiscipline}
        />
      </View>

      <View style={menuStyles.cardRow}>
        <MenuItem
          icon="folder-minus"
          text="Arquivos & Fotos"
          color="#7f8c8d"
          onPress={handleListDisciplines}
        />
        <MenuItem
          icon="cog"
          text="Configurações"
          color="#795548" // Verde
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
