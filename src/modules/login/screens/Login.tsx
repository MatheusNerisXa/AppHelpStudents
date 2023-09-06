import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';

import Button from '../../../shared/components/button/Button';
import Input from '../../../shared/components/input/input';
import Text from '../../../shared/components/text/Text';
import { textTypes } from '../../../shared/components/text/textTypes';
import { theme } from '../../../shared/themes/theme';
import { useLogin } from '../hooks/useLogin';
import { ContainerLogin, Imagelogo } from '../styles/login.style';

const Login = () => {
  const navigation = useNavigation();

  const {
    email,
    password,
    loading,
    errorMessage,
    handleOnPress,
    handleOnChangeEmail,
    handleOnChangePassword,
  } = useLogin();

  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: animationCompleted ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [animationCompleted]);

  const handleAnimationComplete = () => {
    setAnimationCompleted(true);
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20} style={{ flex: 1 }}>
      <View>
        <ContainerLogin>
          <Animated.View
            style={{
              opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                },
              ],
            }}
          >
            <Imagelogo
              resizeMode="cover"
              source={require('../../../assets/images/logo.png')}
              onLoad={handleAnimationComplete}
            />
          </Animated.View>
          <Animated.View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
              width: '100%',
            }}
          >
            <Input
              value={email}
              errorMessage={errorMessage}
              margin="0px 0px 8px 0px"
              placeholder="Digite seu email"
              placeholderTextColor="#000"
              title="Email:"
              onChange={handleOnChangeEmail}
            />
            <Input
              errorMessage={errorMessage}
              value={password}
              secureTextEntry
              placeholder="Digite sua senha"
              placeholderTextColor="#000"
              title="Senha:"
              onChange={handleOnChangePassword}
            />
          </Animated.View>

          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <TouchableOpacity onPress={() => navigation.navigate('CreateUser')}>
              <Animated.View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  opacity: animation,
                  transform: [
                    {
                      translateY: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                  width: 'auto',
                  marginTop: 20,
                }}
              >
                <Text margin="5px" type={textTypes.PARAGRAPH_SEMI_BOLD} color="#253494">
                  PRIMEIRO ACESSO
                </Text>
              </Animated.View>
            </TouchableOpacity>

            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ marginHorizontal: 10, color: theme.colors.blueTheme.blue80, marginTop: 20 }}
            >
              |
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')}>
              <Animated.View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  opacity: animation,
                  transform: [
                    {
                      translateY: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                  width: 'auto',
                  marginTop: 20,
                }}
              >
                <Text margin="5px" type={textTypes.PARAGRAPH_SEMI_BOLD} color="#253494">
                  RECUPERAR SENHA
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </View>

          <Animated.View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              opacity: animation,
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
              width: '100%',
              marginTop: 20,
            }}
          >
            <Button
              type={theme.buttons.buttonsTheme.primary}
              loading={loading}
              title="ENTRAR"
              onPress={handleOnPress}
            />
          </Animated.View>
        </ContainerLogin>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
