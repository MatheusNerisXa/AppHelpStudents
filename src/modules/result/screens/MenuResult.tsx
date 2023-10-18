import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Icon } from '../../../shared/components/icon/Icon';
import { menuStyles } from '../../menu/styles/menu.style';

const ResultMenu = ({ route }) => {
  const navigation = useNavigation();
  const { disciplineId } = route.params;

  const handleResultListing = useCallback(() => {
    navigation.navigate('ResultListing', { disciplineId });
  }, [disciplineId, navigation]);

  const handleResultDetails = useCallback(() => {
    navigation.navigate('ResultDetails', { disciplineId });
  }, [disciplineId, navigation]);

  return (
    <ScrollView contentContainerStyle={menuStyles.container}>
      <View style={menuStyles.cardRow}>
        <MenuItem
          icon="upload"
          text="Adicionar Nota"
          color="#0066CC"
          onPress={handleResultListing}
        />
        <MenuItem
          icon="file-text"
          text="Listagem das Notas"
          color="#6600CC"
          onPress={handleResultDetails}
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

export default ResultMenu;
