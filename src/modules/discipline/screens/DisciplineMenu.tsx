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

  const handleFilesAndPhotos = () => {
    navigation.navigate('FilePhotos');
  };

  const handleCreateDiscipline = () => {
    navigation.navigate('DisciplineCreationScreen');
  };

  return (
    <ScrollView contentContainerStyle={menuStyles.container}>
      <View style={menuStyles.cardRow}>
        {/* <MenuItem
          icon="plus"
          text="Adicionar Matéria"
          color="#0066CC"
          onPress={handleCreateDiscipline}
        /> */}
        <MenuItem icon="book" text="Matérias" color="#6600CC" onPress={handleListDisciplines} />
        <MenuItem
          icon="stats-dots"
          text="Relatórios"
          color="#006633"
          onPress={handleListDisciplines}
        />
      </View>
      {/* <View style={menuStyles.cardRow}>
        <MenuItem
          icon="stats-dots"
          text="Relatórios"
          color="#006633"
          onPress={handleListDisciplines}
        />
        <MenuItem
          icon="checkbox-checked"
          text="Atividades"
          color="#FF6600"
          onPress={handleCreateDiscipline}
        />
      </View> */}

      <View style={menuStyles.cardRow}>
        <MenuItem
          icon="folder-minus"
          text="Arquivos & Fotos"
          color="#7f8c8d"
          onPress={handleFilesAndPhotos}
        />
        <MenuItem
          icon="cog"
          text="Configurações"
          color="#CC3300"
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
