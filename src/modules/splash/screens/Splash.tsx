import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

import { MethodEnum } from '../../../enums/methods.enum';
import { URL_USER } from '../../../shared/constants/urls';
import { MenuUrl } from '../../../shared/enum/MenuUrl.enum';
import { getAuthorizationToken } from '../../../shared/functions/connection/auth';
import { useRequest } from '../../../shared/hooks/useRequest';
import { useUserReducer } from '../../../store/reducers/userReducer/useUserReducer';
import { ContainerSplash, ImagelogoSplash } from '../styles/splash.style';

const Splash = () => {
  const { reset } = useNavigation<NavigationProp<ParamListBase>>();
  const { request } = useRequest();
  const { setUser } = useUserReducer();
  useEffect(() => {
    const verifyLogin = async () => {
      let returnUser;
      const token = await getAuthorizationToken();
      if (token) {
        returnUser = await request({
          url: URL_USER,
          method: MethodEnum.GET,
          saveGlobal: setUser,
        });
      }

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
    verifyLogin();
  }, []);
  return (
    <ContainerSplash>
      <ImagelogoSplash resizeMode="cover" source={require('../../../assets/images/logo.png')} />
    </ContainerSplash>
  );
};

export default Splash;
