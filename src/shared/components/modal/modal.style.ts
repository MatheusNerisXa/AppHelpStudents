import styled from 'styled-components/native';

import { theme } from '../../themes/theme';
import { Icon } from '../icon/Icon';

export const ContainerModal = styled.View`
  background-color: ${theme.colors.neutralTheme.white};
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  position: absolute;
  bottom: 0;
  height: 200px;
  padding: 16px;
  z-index: 9;
  box-shadow: 0px 2px 4px ${theme.colors.neutralTheme.black};
`;

export const IconCloseModal = styled(Icon)`
  position: absolute;
  right: 24px;
  top: 24px;
  z-index: 10;
`;
