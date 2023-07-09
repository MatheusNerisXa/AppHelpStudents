import { forwardRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  TextInputProps,
  View,
} from 'react-native';

import { insertMaskCpf } from '../../functions/cpf';
import { insertMaskInPhone } from '../../functions/phone';
import { theme } from '../../themes/theme';
import { DisplayFlexColumn } from '../globalStyles/globalView.style';
import Text from '../text/Text';
import { textTypes } from '../text/textTypes';
import { ContainerInput, IconEye } from './input.style';

interface InputProps extends TextInputProps {
  title?: string;
  errorMessage?: string;
  secureTextEntry?: boolean;
  margin?: string;
  type?: 'cel-phone' | 'cpf';
}

const Input = forwardRef<TextInput, InputProps>(
  ({ margin, secureTextEntry, title, errorMessage, type, onChange, ...props }: InputProps, ref) => {
    const [currentSecure, setCurrentSecure] = useState<boolean>(!!secureTextEntry);

    const handleOnChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      if (onChange) {
        let text = event.nativeEvent.text;
        switch (type) {
          case 'cpf':
            text = insertMaskCpf(text);
            break;

          case 'cel-phone':
            text = insertMaskInPhone(text);
            break;

          default:
            text = event.nativeEvent.text;
            break;
        }

        onChange({
          ...event,
          nativeEvent: {
            ...event.nativeEvent,
            text,
          },
        });
      }
    };

    const handleOnPressEye = () => {
      setCurrentSecure((current) => !current);
    };

    return (
      <DisplayFlexColumn customMargin={margin}>
        {title && (
          <Text
            margin="0px 0px 4px 8px"
            color={theme.colors.neutralTheme.black}
            type={textTypes.PARAGRAPH_REGULAR}
          >
            {title}
          </Text>
        )}
        <View>
          <ContainerInput
            {...props}
            hasSecureTextEntry={secureTextEntry}
            secureTextEntry={currentSecure}
            isError={!!errorMessage}
            onChange={handleOnChange}
            ref={ref}
          />
          {secureTextEntry && (
            <IconEye
              onPress={handleOnPressEye}
              name={currentSecure ? 'eye' : 'eye-blocked'}
              size={20}
            />
          )}
        </View>
        {errorMessage && (
          <Text
            margin="0px 0px 0px 8px"
            type={textTypes.PARAGRAPH_REGULAR}
            color={theme.colors.orangeTheme.orange80}
          >
            {errorMessage}
          </Text>
        )}
      </DisplayFlexColumn>
    );
  },
);

export default Input;
