import React, { useEffect, useRef, useState } from 'react';
import { Animated, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '../../../shared/components/button/Button';
import Input from '../../../shared/components/input/input';
import { useRequest } from '../../../shared/hooks/useRequest';
import { useUserReducer } from '../../../store/reducers/userReducer/useUserReducer';

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

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#007AFF" />
        }
      >
        <Animated.View
          style={[
            styles.contentContainer,
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
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <Input
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholder="Enter your name"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <Input
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder="Enter your email"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>CPF</Text>
            <Input
              value={cpf}
              onChangeText={setCpf}
              style={styles.input}
              placeholder="Enter your CPF"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <Input
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              placeholder="Enter your phone number"
            />
          </View>
          <Button
            title="Salvar"
            onPress={() => {
              // Handle the form submission here, if needed
            }}
            style={styles.button}
            loading={loading}
          >
            Save Changes
          </Button>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: 'white', // Set the background color of the entire page to white
  },
  container: {
    padding: 16,
    borderRadius: 10,
    margin: 16,
    elevation: 4,
  },
  contentContainer: {
    flexGrow: 1,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: 'black',
  },
  button: {
    marginTop: 24,
  },
});

export default Profile;
