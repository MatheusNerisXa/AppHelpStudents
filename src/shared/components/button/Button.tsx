import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { theme } from '../../themes/theme';
import Text from '../text/Text';
import { textTypes } from '../text/textTypes';
import {
  ActivityIndicatorButton,
  ButtonContainer,
  ButtonDisabled,
  GradientButton,
} from './button.style';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  margin?: string;
  type?: string;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
}

const Button = ({ title, type, disabled, loading, margin, onPress, ...props }: ButtonProps) => {
  const handleOnPress = () => {
    if (!loading && !disabled && onPress) {
      onPress();
    }
  };

  const buttonColor =
    type === theme.buttons.buttonsTheme.secondary
      ? theme.colors.mainTheme.primary
      : theme.colors.coral.coral80;

  const renderText = (color: string) => (
    <>
      <Text type={textTypes.BUTTON_SEMI_BOLD} color={color}>
        {title}
      </Text>
      {loading && <ActivityIndicatorButton color={theme.colors.neutralTheme.white} />}
    </>
  );

  if (disabled) {
    return (
      <ButtonDisabled {...props} margin={margin}>
        {renderText(theme.colors.neutralTheme.white)}
      </ButtonDisabled>
    );
  }

  return (
    <ButtonContainer margin={margin} {...props} onPress={handleOnPress}>
      <GradientButton
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[buttonColor, buttonColor]}
      >
        {renderText(theme.colors.neutralTheme.white)}
      </GradientButton>
    </ButtonContainer>
  );
};

export default Button;
