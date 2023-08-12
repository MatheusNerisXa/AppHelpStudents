import React, { useEffect, useRef, useState } from 'react';
import { Animated, RefreshControl, ScrollView, Text, TextInput, View } from 'react-native';

import Button from '../../../shared/components/button/Button';
import { useRequest } from '../../../shared/hooks/useRequest';
import { useUserReducer } from '../../../store/reducers/userReducer/useUserReducer';
import profileStyle from '../styles/profile.style';

const Profile = () => {
  const { user, setUser } = useUserReducer();
  const { loading, authRequest, getUserFromStorage } = useRequest();
  const [refreshing, setRefreshing] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');

  const animation = useRef(new Animated.Value(0)).current;

  const onRefresh = async () => {
    setRefreshing(true);
    const userId = user?.id;
    if (userId) {
      const response = await authRequest({});
      if (response) {
        setUser(response);
      }
    }
    setRefreshing(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = user?.id;
      if (!userId) {
        const userDataFromStorage = await getUserFromStorage();
        if (userDataFromStorage) {
          setUser(userDataFromStorage);
        }
      } else {
        const response = await authRequest({});
        if (response) {
          setUser(response);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [animation]);

  useEffect(() => {
    if (user && user.name && user.email && user.cpf && user.phone) {
      setName(user.name);
      setEmail(user.email);
      setCpf(user.cpf);
      setPhone(user.phone);
    }
  }, [user]);

  const handleSaveChanges = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updatedUser = { ...user, name, email, cpf, phone };
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
            <Text style={profileStyle.label}>Nome</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={profileStyle.input}
              placeholder="Digite o seu nome"
            />
          </View>
          <View style={profileStyle.inputContainer}>
            <Text style={profileStyle.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={profileStyle.input}
              placeholder="Digite o seu email"
            />
          </View>
          <View style={profileStyle.inputContainer}>
            <Text style={profileStyle.label}>CPF</Text>
            <TextInput
              value={cpf}
              onChangeText={setCpf}
              style={profileStyle.input}
              placeholder="Digite o seu CPF"
            />
          </View>
          <View style={profileStyle.inputContainer}>
            <Text style={profileStyle.label}>Celular</Text>
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
            loading={loading}
          >
            Salvar Alterações
          </Button>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default Profile;
