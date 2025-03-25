import React, {useState} from 'react';
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {theme} from '../../hooks/theme/theme';
import {Icon, IconName} from '../icon/icon';

const {colors} = theme;

interface InputProps {
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
  placeholder?: string;
  multiline?: boolean;
  editable?: boolean;
  value?: string | null;
  isPassword?: boolean;
  keyboardType?: any;
  inputStyle?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
  onChangeText?: (value: string) => void;
}

export const Input = ({
  style,
  inputStyle,
  placeholder,
  multiline = false,
  editable = true,
  value = '',
  isPassword = false,
  keyboardType = 'default',
  onChangeText,
}: InputProps) => {
  const styles = createStyle(style, editable, multiline, inputStyle);

  const [valueText, setValueText] = useState<string | null>(value);
  const [isShowPass, setIsShowPass] = useState<boolean>(
    isPassword ? true : false,
  );

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
        value={valueText || ''}
        editable={editable}
        multiline={multiline}
        placeholder={placeholder}
        onChangeText={handleTextChange}
        placeholderTextColor={'gray'}
        scrollEnabled={false}
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
  style?: StyleProp<any>,
  editable?: boolean,
  multiline?: boolean,
  inputStyle?: StyleProp<any>,
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
      justifyContent: 'space-between',
      ...style,
    },
    btnWrapper: {
      marginLeft: 4,
      height: 28,
      width: 28,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
