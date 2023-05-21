import { Text, View } from 'react-native';

import Button from '../../../shared/button/Button';
import Input from '../../../shared/components/input/input';
import { ContainerLogin } from '../styles/login.style';

const Login = () => {
  const handleOnPress = () => {
    console.log('Clicou');
  };

  return (
    <View>
      <ContainerLogin>
        <Text>Matheus</Text>
        <Input />
        <Button margin="16px" title="ENTRAR" onPress={handleOnPress} />
      </ContainerLogin>
    </View>
  );
};

export default Login;
