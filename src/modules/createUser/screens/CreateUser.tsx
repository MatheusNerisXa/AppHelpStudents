import React, { useEffect, useRef } from 'react';
import { Animated, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Button from '../../../shared/components/button/Button';
import Input from '../../../shared/components/input/input';
import { useCreateUser } from '../hooks/useCreateUser';
import { CreateUserContainer } from '../styles/createUser.style';

const CreateUser = () => {
  const { createUser, disabled, loading, handleOnChangeInput, handleCreateUser } = useCreateUser();

  const phoneInput = useRef<TextInput>(null);
  const emailInput = useRef<TextInput>(null);
  const cpfInput = useRef<TextInput>(null);
  const passwordInput = useRef<TextInput>(null);
  const confirmPasswordInput = useRef<TextInput>(null);

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [animation]);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <CreateUserContainer>
        <Animated.View
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
          }}
        >
          <Input
            value={createUser.name}
            onChange={(event) => handleOnChangeInput(event, 'name')}
            margin="0px 0px 16px 0px"
            maxLength={150}
            placeholder="Digite"
            title="Nome Completo:"
            onSubmitEditing={() => phoneInput?.current?.focus()}
          />
          <Input
            value={createUser.phone}
            onChange={(event) => handleOnChangeInput(event, 'phone')}
            type="cel-phone"
            maxLength={15}
            margin="0px 0px 16px 0px"
            placeholder="Digite"
            title="Telefone:"
            keyboardType="number-pad"
            ref={phoneInput}
            onSubmitEditing={() => emailInput?.current?.focus()}
          />
          <Input
            value={createUser.email}
            onChange={(event) => handleOnChangeInput(event, 'email')}
            margin="0px 0px 16px 0px"
            maxLength={254}
            placeholder="Digite"
            title="Email:"
            keyboardType="email-address"
            ref={emailInput}
            onSubmitEditing={() => cpfInput?.current?.focus()}
          />
          <Input
            onChange={(event) => handleOnChangeInput(event, 'cpf')}
            value={createUser.cpf}
            maxLength={12}
            type="cpf"
            margin="0px 0px 16px 0px"
            placeholder="Digite"
            title="CPF:"
            keyboardType="number-pad"
            ref={cpfInput}
            onSubmitEditing={() => passwordInput?.current?.focus()}
          />
          <Input
            value={createUser.password}
            onChange={(event) => handleOnChangeInput(event, 'password')}
            margin="0px 0px 16px 0px"
            maxLength={20}
            placeholder="Digite"
            title="Senha:"
            secureTextEntry
            ref={passwordInput}
            onSubmitEditing={() => confirmPasswordInput?.current?.focus()}
          />
          <Input
            value={createUser.confirmPassword}
            onChange={(event) => handleOnChangeInput(event, 'confirmPassword')}
            margin="0px 0px 16px 0px"
            maxLength={20}
            placeholder="Digite"
            title="Confirmar senha:"
            secureTextEntry
            ref={confirmPasswordInput}
            onSubmitEditing={handleCreateUser}
          />
          <Button
            disabled={disabled}
            onPress={handleCreateUser}
            loading={loading}
            margin="0px 0px 32px 0px"
            title="Criar usuário"
          />
        </Animated.View>
      </CreateUserContainer>
    </KeyboardAwareScrollView>
  );
};

export default CreateUser;
