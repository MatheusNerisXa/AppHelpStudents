import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';

import Button from '../../../shared/components/button/Button';
import Input from '../../../shared/components/input/input';
import { URL_Password_Recovery } from '../../../shared/constants/urls';
import { theme } from '../../../shared/themes/theme';
import passStyle from '../styles/passwordRecovery.style';

const PasswordRecoveryScreen = () => {
  const [email, setEmail] = useState('');

  const handleRecoverPassword = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    try {
      const response = await fetch(URL_Password_Recovery, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
      } else if (response.status === 404) {
        Alert.alert('Erro', 'Não foi possível recuperar a senha. Verifique o email fornecido.');
      } else {
        Alert.alert('Sucesso', `Senha enviada para o email ${email}`);
      }
    } catch (error) {
      console.error('Erro ao recuperar senha:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado ao recuperar a senha.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={passStyle.container}
    >
      <Input
        value={email}
        margin="0px 0px 8px 0px"
        placeholder="Digite seu email"
        placeholderTextColor="#000"
        keyboardType="email-address"
        title="Email:"
        onChangeText={(text) => setEmail(text)}
      />
      <Button
        style={passStyle.button}
        type={theme.buttons.buttonsTheme.primary}
        title="RECUPERAR SENHA"
        onPress={handleRecoverPassword}
      />
    </KeyboardAvoidingView>
  );
};

export default PasswordRecoveryScreen;
