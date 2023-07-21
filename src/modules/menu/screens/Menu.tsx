import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Icon } from '../../../shared/components/icon/Icon';
import Text from '../../../shared/components/text/Text';
import { MenuUrl } from '../../../shared/enum/MenuUrl.enum';
import { logout } from '../../../shared/functions/connection/auth';
import { menuStyles } from '../styles/menu.style';

const Menu = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleLogout = () => {
    logout(navigation);
  };

  const handleExamPress = () => {
    navigation.navigate(MenuUrl.Exam);
  };

  const handleProfilePress = () => {
    navigation.navigate(MenuUrl.Profile);
  };

  return (
    <View style={menuStyles.container}>
      <TouchableOpacity style={menuStyles.optionContainer} onPress={handleExamPress}>
        <Icon name="books" size={24} color="#007AFF" style={menuStyles.optionIcon} />
        <Text style={menuStyles.optionText}>Vestibulares</Text>
      </TouchableOpacity>
      <TouchableOpacity style={menuStyles.optionContainer} onPress={handleProfilePress}>
        <Icon name="profile" size={24} color="#007AFF" style={menuStyles.optionIcon} />
        <Text style={menuStyles.optionText}>Meus Dados</Text>
      </TouchableOpacity>
      <TouchableOpacity style={menuStyles.optionContainer}>
        <Icon name="profile" size={24} color="#007AFF" style={menuStyles.optionIcon} />
        <Text style={menuStyles.optionText}>Configurações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={menuStyles.optionContainer}>
        <Icon name="profile" size={24} color="#007AFF" style={menuStyles.optionIcon} />
        <Text style={menuStyles.optionText}>Ajuda</Text>
      </TouchableOpacity>
      <TouchableOpacity style={menuStyles.optionContainer} onPress={handleLogout}>
        <Icon name="exit" size={24} color="#007AFF" style={menuStyles.optionIcon} />
        <Text style={menuStyles.optionText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
