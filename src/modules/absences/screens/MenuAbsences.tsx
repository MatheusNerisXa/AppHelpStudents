import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Icon } from '../../../shared/components/icon/Icon';
import { menuStyles } from '../../menu/styles/menu.style';

const AbsencesMenu = ({ route }) => {
  const navigation = useNavigation();
  const { disciplineId } = route.params;

  const handleAbsences = useCallback(() => {
    navigation.navigate('Absences', { disciplineId });
  }, [disciplineId, navigation]);

  const handleAbsencesDetails = useCallback(() => {
    navigation.navigate('AbsencesDetails', { disciplineId });
  }, [disciplineId, navigation]);

  return (
    <ScrollView contentContainerStyle={menuStyles.container}>
      <View style={menuStyles.cardRow}>
        <MenuItem icon="upload" text="Adicionar Falta" color="#0066CC" onPress={handleAbsences} />
        <MenuItem
          icon="file-text"
          text="Listagem de faltas"
          color="#6600CC"
          onPress={handleAbsencesDetails}
        />
      </View>
    </ScrollView>
  );
};

const MenuItem = ({ onPress, icon, text, color }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[menuStyles.cardContainer, { backgroundColor: color }]}>
      <Icon name={icon} size={32} color="#FFF" style={menuStyles.icon} />
      <Text style={menuStyles.cardText}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export default AbsencesMenu;
