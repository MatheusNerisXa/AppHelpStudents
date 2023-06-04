import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItemStorage = async (key: string, value: string) =>
  AsyncStorage.setItem(key, value).catch();

export const getItemStorage = async (key: string) =>
  await AsyncStorage.getItem(key).catch(() => '');

export const removeItemStorage = async (key: string) => await AsyncStorage.removeItem(key).catch();
