import { SafeAreaView, Text } from 'react-native';
import styled from 'styled-components/native';

const TextNew = styled.Text`
  font-size: 25px;
  color: blue;
`;

const App = () => {
  return (
    <SafeAreaView>
      <Text>Testando</Text>
      <TextNew>Novo teste</TextNew>
    </SafeAreaView>
  );
};

export default App;
