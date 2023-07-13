import { useRef } from 'react';
import { TextInput } from 'react-native/types';
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

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <CreateUserContainer>
        <Input
          value={createUser.name}
          onChange={(event) => handleOnChangeInput(event, 'name')}
          margin="0px 0px 16px 0px"
          placeholder="Digite"
          title="Nome Completo:"
          onSubmitEditing={() => phoneInput?.current?.focus()}
        />
        <Input
          value={createUser.phone}
          onChange={(event) => handleOnChangeInput(event, 'phone')}
          type="cel-phone"
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
          placeholder="Digite"
          title="Email:"
          keyboardType="email-address"
          ref={emailInput}
          onSubmitEditing={() => cpfInput?.current?.focus()}
        />
        <Input
          onChange={(event) => handleOnChangeInput(event, 'cpf')}
          value={createUser.cpf}
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
      </CreateUserContainer>
    </KeyboardAwareScrollView>
  );
};

export default CreateUser;
