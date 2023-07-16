import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Icon } from '../../../shared/components/icon/Icon';
import Text from '../../../shared/components/text/Text';
import { logout } from '../../../shared/functions/connection/auth';

const Menu = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleLogout = () => {
    logout(navigation);
  };

  const handleExamPress = () => {
    navigation.navigate('Vestibulares');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.optionContainer} onPress={handleExamPress}>
        <Icon name="books" size={24} color="#007AFF" style={styles.optionIcon} />
        <Text style={styles.optionText}>Vestibulares</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer}>
        <Icon name="profile" size={24} color="#007AFF" style={styles.optionIcon} />
        <Text style={styles.optionText}>Meus Dados</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer}>
        <Icon name="profile" size={24} color="#007AFF" style={styles.optionIcon} />
        <Text style={styles.optionText}>Configurações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer}>
        <Icon name="profile" size={24} color="#007AFF" style={styles.optionIcon} />
        <Text style={styles.optionText}>Ajuda</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer} onPress={handleLogout}>
        <Icon name="exit" size={24} color="#007AFF" style={styles.optionIcon} />
        <Text style={styles.optionText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#F2F2F2',
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default Menu;
