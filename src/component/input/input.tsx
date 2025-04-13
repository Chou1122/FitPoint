import React, {useState, useRef} from 'react';
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
  textColor?: string;
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
  textColor = 'black',
}: InputProps) => {
  const styles = createStyle(style, editable, multiline, inputStyle);
  const inputRef = useRef<TextInput>(null); // Tạo ref cho TextInput

  const [valueText, setValueText] = useState<string | null>(value);
  const [isShowPass, setIsShowPass] = useState<boolean>(isPassword);

  const handleTextChange = (value: string) => {
    setValueText(value);
    onChangeText && onChangeText(value);
  };

  const handleEyePress = () => {
    setIsShowPass(!isShowPass);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => inputRef.current?.focus()}>
      <TextInput
        ref={inputRef}
        keyboardType={keyboardType}
        secureTextEntry={isShowPass}
        value={valueText || ''}
        editable={editable}
        multiline={multiline}
        placeholder={placeholder}
        onChangeText={handleTextChange}
        placeholderTextColor={'gray'}
        scrollEnabled={false}
        style={{color: textColor}}
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
    </TouchableOpacity>
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
