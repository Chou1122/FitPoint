import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import {theme} from '../../hooks/theme/theme';
import {Icon, IconName} from '../icon/icon';

const {colors} = theme;

interface InputProps {
  style?: ViewProps;
  placeholder?: string;
  multiline?: boolean;
  editable?: boolean;
  value?: string;
  isPassword?: boolean;
  keyboardType?: any;
  onChangeText?: (value: string) => void;
}

export const Input = ({
  style,
  placeholder,
  multiline = false,
  editable = true,
  value = '',
  isPassword = false,
  keyboardType = 'default',
  onChangeText,
}: InputProps) => {
  const styles = createStyle(style, editable, multiline);

  const [valueText, setValueText] = useState<string>(value);
  const [isSecure, setIsSecure] = useState<boolean>(isPassword);
  const [isShowPass, setIsShowPass] = useState<boolean>(isPassword);

  const handleTextChange = (value: string) => {
    setValueText(value);
    onChangeText && onChangeText(value);
  };

  const handleEyePress = () => {
    setIsShowPass(!isShowPass);
  };

  return (
    <View style={styles.container}>
      <TextInput
        keyboardType={keyboardType}
        secureTextEntry={isShowPass}
        value={valueText}
        editable={editable}
        multiline={multiline}
        placeholder={placeholder}
        style={styles.inputStyle}
        onChangeText={handleTextChange}
        placeholderTextColor={'gray'}
      />
      {isPassword && (
        <TouchableOpacity style={styles.btnWrapper} onPress={handleEyePress}>
          <Icon
            name={
              isShowPass
                ? IconName['icon-eye-open']
                : IconName['icon-eye-close']
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const createStyle = (
  style?: ViewProps,
  editable?: boolean,
  multiline?: boolean,
) =>
  StyleSheet.create({
    icon: {
      height: 20,
      width: 20,
    },
    container: {
      alignItems: 'center',
      paddingHorizontal: 8,
      borderRadius: 8,
      borderWidth: 1,
      backgroundColor: !editable ? colors.gray : colors.white,
      borderColor: colors.gray3,
      flexDirection: 'row',
      maxHeight: !multiline ? 40 : null,
      ...style,
    },
    btnWrapper: {
      marginLeft: 4,
      height: 28,
      width: 28,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputStyle: {
      color: colors.black,
      paddingRight: 8,
      flex: 1,
    },
  });
