import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, ScrollView, Text, TextInput, View } from 'react-native';

import Button from '../../../shared/components/button/Button';
import { URL_USER_ID } from '../../../shared/constants/urls';
import { useRequest } from '../../../shared/hooks/useRequest';
import profileStyle from '../styles/profile.style';

const Profile = () => {
  const { user, setUser } = useRequest();

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

        setName(updatedUser.name);
        setEmail(updatedUser.email);
        setCpf(updatedUser.cpf);
        setPhone(updatedUser.phone);

        setUser(updatedUser);
      } else {
        console.error('Falha ao buscar os dados atualizados do usuário.');
        Alert.alert('Erro', 'Falha ao buscar os dados atualizados do usuário.');
      }
    } catch (error) {
      console.error('Erro ao buscar os dados atualizados:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar os dados atualizados do usuário.');
    }
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

      fetchUserData();
    }
  }, [animation, user]);

  const handleSaveChanges = async () => {
    try {
      console.log('Salvando alterações...');
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
        console.log('Perfil atualizado com sucesso.');
        const updatedUserData = {
          ...user,
          ...updatedFields,
        };

        setUser(updatedUserData);

        Alert.alert('Sucesso', 'Perfil atualizado com sucesso.', [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressionado');
            },
          },
        ]);
      } else {
        console.error('Erro ao atualizar o perfil do usuário:', response.statusText);
        Alert.alert('Erro', 'Falha ao atualizar o perfil.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o perfil do usuário:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o perfil.');
    }
  };

  return (
    <View style={profileStyle.pageContainer}>
      <ScrollView contentContainerStyle={profileStyle.container}>
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
            <Text style={profileStyle.label}>Name:</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={profileStyle.input}
              placeholder="Enter your name"
            />
          </View>
          <View style={profileStyle.inputContainer}>
            <Text style={profileStyle.label}>Email:</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={profileStyle.input}
              placeholder="Enter your email"
            />
          </View>
          <View style={profileStyle.inputContainer}>
            <Text style={profileStyle.label}>CPF:</Text>
            <TextInput
              value={cpf}
              onChangeText={setCpf}
              style={profileStyle.input}
              placeholder="Enter your CPF"
            />
          </View>
          <View style={profileStyle.inputContainer}>
            <Text style={profileStyle.label}>Phone:</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              style={profileStyle.input}
              placeholder="Enter your phone number"
            />
          </View>
          <Button title="Save Changes" onPress={handleSaveChanges} />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default Profile;
