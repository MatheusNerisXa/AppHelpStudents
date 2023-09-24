import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Icon } from '../../../shared/components/icon/Icon';
import { menuStyles } from '../../menu/styles/menu.style';

const AbsencesMenu = ({ route }) => {
  const navigation = useNavigation();
  const { disciplineId } = route.params;

  const handleAbsences = useCallback(() => {
    navigation.navigate('Absences', { disciplineId });
  }, [disciplineId, navigation]);

  const handleListDisciplines = useCallback(() => {
    navigation.navigate('Discipline');
  }, [navigation]);

  //   const handleCreateDiscipline = useCallback(() => {
  //     navigation.navigate('DisciplineCreationScreen');
  //   }, [navigation]);

  return (
    <ScrollView contentContainerStyle={menuStyles.container}>
      <View style={menuStyles.cardRow}>
        <MenuItem icon="upload" text="Adicionar Falta" color="#0066CC" onPress={handleAbsences} />
        <MenuItem icon="book" text="Ver Matérias" color="#6600CC" onPress={handleListDisciplines} />
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

export default AbsencesMenu;
