import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, RefreshControl, ScrollView, Text, TextInput, View } from 'react-native';

import Button from '../../../shared/components/button/Button';
import { URL_USER_ID } from '../../../shared/constants/urls';
import { useRequest } from '../../../shared/hooks/useRequest';
import profileStyle from '../styles/profile.style';

const Profile = () => {
  const { user, setUser } = useRequest();
  const [refreshing, setRefreshing] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');

  const animation = useRef(new Animated.Value(0)).current;

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${URL_USER_ID}${user.id}`);

      if (response.status === 200) {
        const updatedUser = response.data;
        console.log('Dados atualizados:', updatedUser);

        // Atualize o estado local com os novos valores
        setName(updatedUser.name);
        setEmail(updatedUser.email);
        setCpf(updatedUser.cpf);
        setPhone(updatedUser.phone);

        // Atualize o estado global do usuário, se necessário
        setUser(updatedUser);
      } else {
        throw new Error('Não foi possível buscar os dados atualizados do usuário.');
      }
    } catch (error) {
      console.error('Erro ao buscar dados atualizados:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserData();
    setRefreshing(false);
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    if (user) {
      setName(user.name);
      setEmail(user.email);
      setCpf(user.cpf);
      setPhone(user.phone);
    }

    // Carregue os dados do usuário ao carregar a página inicial
    fetchUserData();
  }, [animation, user]);

  const handleSaveChanges = async () => {
    try {
      console.log('Saving changes...');
      const updatedFields = {};
      if (name !== user.name) {
        updatedFields.name = name;
      }
      if (email !== user.email) {
        updatedFields.email = email;
      }
      if (cpf !== user.cpf) {
        updatedFields.cpf = cpf;
      }
      if (phone !== user.phone) {
        updatedFields.phone = phone;
      }

      const response = await axios.put(URL_USER_ID + `${user.id}`, updatedFields, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Profile updated successfully.');
        const updatedUserData = {
          ...user,
          ...updatedFields,
        };

        // Atualize o estado global do usuário, se necessário
        setUser(updatedUserData);

        // Exibir mensagem de sucesso com botão "OK"
        Alert.alert('Sucesso', 'Cadastro atualizado com sucesso.', [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
              // Coloque aqui qualquer ação adicional que você queira realizar após o OK
            },
          },
        ]);
      } else {
        console.error('Error updating user profile:', response.statusText);
        // Exibir mensagem de erro com botão "OK"
        Alert.alert('Erro', 'Não foi possível atualizar o cadastro.', [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
              // Coloque aqui qualquer ação adicional que você queira realizar após o OK
            },
          },
        ]);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      // Exibir mensagem de erro com botão "OK"
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o cadastro.', [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            // Coloque aqui qualquer ação adicional que você queira realizar após o OK
          },
        },
      ]);
    }
  };

  return (
    <View style={profileStyle.pageContainer}>
      <ScrollView
        contentContainerStyle={profileStyle.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#007AFF" />
        }
      >
        <Animated.View
          style={[
            profileStyle.contentContainer,
            {
              opacity: animation,
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={profileStyle.inputContainer}>
            <Text style={profileStyle.label}>Nome:</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={profileStyle.input}
              placeholder="Digite o seu nome"
            />
          </View>
          <View style={profileStyle.inputContainer}>
            <Text style={profileStyle.label}>Email:</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={profileStyle.input}
              placeholder="Digite o seu email"
            />
          </View>
          <View style={profileStyle.inputContainer}>
            <Text style={profileStyle.label}>CPF:</Text>
            <TextInput
              value={cpf}
              onChangeText={setCpf}
              style={profileStyle.input}
              placeholder="Digite o seu CPF"
            />
          </View>
          <View style={profileStyle.inputContainer}>
            <Text style={profileStyle.label}>Celular:</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              style={profileStyle.input}
              placeholder="Digite o seu número de celular"
            />
          </View>
          <Button
            title="Salvar"
            onPress={handleSaveChanges}
            style={profileStyle.button}
            loading={false}
          >
            Salvar Alterações
          </Button>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default Profile;
