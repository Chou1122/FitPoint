import React from 'react';
import {Text, TextProps, TextStyle, StyleSheet} from 'react-native';

type FontWeight =
  | 'Regular'
  | 'Bold'
  | 'Italic'
  | 'BoldItalic'
  | 'Light'
  | 'LightItalic'
  | 'Medium'
  | 'MediumItalic'
  | 'Thin'
  | 'ThinItalic';

interface CustomTextProps extends TextProps {
  fontWeight?: FontWeight;
  style?: TextStyle;
}

const fontMap: Record<FontWeight, string> = {
  Regular: 'Roboto-Regular',
  Bold: 'Roboto-Bold',
  Italic: 'Roboto-Italic',
  BoldItalic: 'Roboto-BoldItalic',
  Light: 'Roboto-Light',
  LightItalic: 'Roboto-LightItalic',
  Medium: 'Roboto-Medium',
  MediumItalic: 'Roboto-MediumItalic',
  Thin: 'Roboto-Thin',
  ThinItalic: 'Roboto-ThinItalic',
};

export const CustomText: React.FC<CustomTextProps> = ({
  fontWeight = 'Regular',
  style,
  children,
  ...props
}) => {
  const fontFamily = fontMap[fontWeight];

  return (
    <Text style={[styles.defaultStyle, {fontFamily}, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    fontSize: 16,
    color: '#000',
  },
});
