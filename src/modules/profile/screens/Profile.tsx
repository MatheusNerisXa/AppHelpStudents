import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import Button from '../../../shared/components/button/Button';
import Text from '../../../shared/components/text/Text';
import { logout } from '../../../shared/functions/connection/auth';

const Profile = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View>
      <Text>Profile</Text>
      <Button title="SAIR" onPress={() => logout(navigation)} />
    </View>
  );
};

export default Profile;
