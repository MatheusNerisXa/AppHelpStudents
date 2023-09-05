import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, RefreshControl, ScrollView, Text, TextInput, View } from 'react-native';

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

  const onRefresh = async () => {
    setRefreshing(true);
    // Fetch updated user data
    const updatedUser = await fetchUpdatedUserData();
    setUser(updatedUser);
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

      console.log(response);

      if (response.ok) {
        console.log('Profile updated successfully.');
        // Atualize o estado do usuário com os novos dados
        const updatedUserData = {
          ...user,
          ...updatedFields,
        };
        setUser(updatedUserData);
      } else {
        console.error('Error updating user profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
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
