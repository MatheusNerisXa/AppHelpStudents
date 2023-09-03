/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useEffect, useReducer } from 'react';

import { useGlobalReducer } from '../../store/reducers/globalReducer/useGlobalReducer';
import { useUserReducer } from '../../store/reducers/userReducer/useUserReducer';
import { AUTHORIZATION_KEY } from '../constants/authorizationConstants';
import { URL_AUTH } from '../constants/urls';
import { MenuUrl } from '../enum/MenuUrl.enum';
import { setAuthorizationToken } from '../functions/connection/auth';
import ConnectionAPI, {
  connectionAPIPost,
  MethodType,
} from '../functions/connection/connectionAPI';
import { RequestLogin } from '../types/requestLogin';
import { ReturnLogin } from '../types/returnLogin';

interface RequestProps<T> {
  url: string;
  method: MethodType;
  saveGlobal?: (object: T) => void;
  body?: unknown;
  message?: string;
}

interface RequestState {
  loading: boolean;
  errorMessage: string;
  user: any;
}

type RequestAction =
  | { type: 'START_REQUEST' }
  | { type: 'REQUEST_SUCCESS' }
  | { type: 'REQUEST_FAILURE'; payload: string }
  | { type: 'SET_ERROR_MESSAGE'; payload: string }
  | { type: 'SET_USER'; payload: any };

const requestReducer = (state: RequestState, action: RequestAction): RequestState => {
  switch (action.type) {
    case 'START_REQUEST':
      return { ...state, loading: true, errorMessage: '' };
    case 'REQUEST_SUCCESS':
      return { ...state, loading: false };
    case 'REQUEST_FAILURE':
      return { ...state, loading: false, errorMessage: action.payload };
    case 'SET_ERROR_MESSAGE':
      return { ...state, errorMessage: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const useRequest = () => {
  const { reset } = useNavigation<NavigationProp<ParamListBase>>();
  const { setUser } = useUserReducer();
  const { setModal } = useGlobalReducer();

  const [state, dispatch] = useReducer(requestReducer, {
    loading: false,
    errorMessage: '',
    user: null,
  });

  const request = async <T>({
    url,
    method,
    saveGlobal,
    body,
    message,
  }: RequestProps<T>): Promise<T | undefined> => {
    dispatch({ type: 'START_REQUEST' });

    try {
      const result = await ConnectionAPI.connect<T>(url, method, body);

      if (saveGlobal) {
        saveGlobal(result);
      }

      if (message) {
        setModal({
          visible: true,
          title: 'Sucesso!',
          text: message,
        });
      }

      dispatch({ type: 'REQUEST_SUCCESS' });
      return result;
    } catch (error: any) {
      console.log('Error in API call:', error);

      dispatch({ type: 'REQUEST_FAILURE', payload: 'An error occurred. Please try again later.' });
      return undefined;
    }
  };

  const saveUserToStorage = async (user: any) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.log('Error saving user to storage:', error);
    }
  };

  const getUserFromStorage = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.log('Error getting user from storage:', error);
      return null;
    }
  };

  const authRequest = async (body: RequestLogin) => {
    dispatch({ type: 'START_REQUEST' });

    try {
      const response = await connectionAPIPost<ReturnLogin>(URL_AUTH, body);

      if (response) {
        setAuthorizationToken(AUTHORIZATION_KEY);
        setUser(response.user);
        await saveUserToStorage(response.user);
        reset({
          index: 0,
          routes: [{ name: MenuUrl.HOME }],
        });
      }

      dispatch({ type: 'REQUEST_SUCCESS' });
    } catch (error: any) {
      console.log('Error in auth request:', error);

      dispatch({
        type: 'REQUEST_FAILURE',
        payload: 'Usuário ou senha incorretos.',
      });
    }
  };

  const setErrorMessage = (message: string) => {
    dispatch({ type: 'SET_ERROR_MESSAGE', payload: message });
  };

  useEffect(() => {
    const fetchUserFromStorage = async () => {
      const userData = await getUserFromStorage();
      dispatch({ type: 'SET_USER', payload: userData });
    };

    fetchUserFromStorage();
  }, []);

  return {
    request,
    loading: state.loading,
    errorMessage: state.errorMessage,
    setErrorMessage,
    authRequest,
    getUserFromStorage,
    user: state.user,
  };
};
