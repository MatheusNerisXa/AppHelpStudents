import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Typewriter from 'react-native-typewriter'; // Importe o Typewriter

import { MethodEnum } from '../../../enums/methods.enum';
import { URL_USER } from '../../../shared/constants/urls';
import { MenuUrl } from '../../../shared/enum/MenuUrl.enum';
import { getAuthorizationToken } from '../../../shared/functions/connection/auth';
import { useRequest } from '../../../shared/hooks/useRequest';
import { UserType } from '../../../shared/types/userType';
import { useUserReducer } from '../../../store/reducers/userReducer/useUserReducer';
import { ContainerSplash, ImagelogoSplash } from '../styles/splash.style';

const TIME = 3000;

const Splash = () => {
  const { reset } = useNavigation<NavigationProp<ParamListBase>>();
  const { request } = useRequest();
  const { setUser } = useUserReducer();

  useEffect(() => {
    const findUser = async (): Promise<undefined | UserType> => {
      let returnUser;
      const token = await getAuthorizationToken();
      console.log('TOKEN =', token);
      if (token) {
        returnUser = await request<UserType>({
          url: URL_USER,
          method: MethodEnum.GET,
          saveGlobal: setUser,
        });
      }
      return returnUser;
    };

    const verifyLogin = async () => {
      const [returnUser] = await Promise.all([
        findUser(),
        new Promise<void>((r) => setTimeout(r, TIME)),
      ]);
      if (returnUser) {
        reset({
          index: 0,
          routes: [{ name: MenuUrl.HOME }],
        });
      } else {
        reset({
          index: 0,
          routes: [{ name: MenuUrl.LOGIN }],
        });
      }
    };

    // Inicie a animação após um pequeno atraso
    setTimeout(() => {
      verifyLogin();
    }, 1000);
  }, []);

  return (
    <ContainerSplash>
      <Animatable.View animation="fadeIn" duration={2000}>
        <ImagelogoSplash resizeMode="cover" source={require('../../../assets/images/logo.png')} />
      </Animatable.View>
      {/* Use o Typewriter para animar o texto */}
      <Animatable.View animation="fadeIn" duration={2000}>
        <Typewriter style={styles.text} typing={1} maxDelay={100} fixed={true}>
          HelpStudents
        </Typewriter>
      </Animatable.View>
    </ContainerSplash>
  );
};

export default Splash;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});
