import styled from 'styled-components/native';

import { theme } from '../../themes/theme';
import { Icon } from '../icon/Icon';

interface ContainerInputProps {
  isError?: boolean;
  hasSecureTextEntry?: boolean;
}

export const ContainerInput = styled.TextInput<ContainerInputProps>`
  width: 100%;
  height: 48px;
  padding: 16px;
  background-color: ${theme.colors.neutralTheme.white};
  color: ${theme.colors.neutralTheme.black};
  border-radius: 4px;

  padding-right: ${(props: { hasSecureTextEntry: unknown }) =>
    props.hasSecureTextEntry ? '52px' : '16px'};
  border-width: 1px;
  border-color: ${(props: { isError: unknown }) =>
    props.isError ? theme.colors.blueTheme.blue80 : theme.colors.grayTheme.gray80};
`;

export const IconEye = styled(Icon)`
  position: absolute;
  color: ${theme.colors.pink.pink80};
  right: 16px;
  top: 12px;
`;
