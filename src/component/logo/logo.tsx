import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, IconName} from '../icon/icon';
import {theme} from '../../hooks/theme/theme';

const {colors, font, space} = theme;

interface LogoProps {
  theme?: 'dark' | 'light';
  size?: 'small' | 'normal' | 'big' | 'giant';
}

export const Logo = ({theme = 'dark', size = 'normal'}: LogoProps) => {
  const styles = createStyle(theme, size);

  return (
    <View style={styles.container}>
      <Icon name={IconName['icon-hand-with-weight']} style={styles.icon} />
    </View>
  );
};

const createStyle = (
  theme: 'dark' | 'light',
  size: 'small' | 'normal' | 'big' | 'giant',
) =>
  StyleSheet.create({
    container: {
      height:
        size == 'normal' ? 38 : size == 'small' ? 32 : size == 'big' ? 44 : 60,
      width:
        size == 'normal' ? 38 : size == 'small' ? 32 : size == 'big' ? 44 : 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      borderWidth:
        size == 'normal' ? 4 : size == 'small' ? 3 : size == 'big' ? 5 : 6,
      borderColor: theme === 'dark' ? colors.black : colors.white,
    },
    icon: {
      height:
        size == 'normal' ? 24 : size == 'small' ? 19 : size == 'big' ? 28 : 40,
      width:
        size == 'normal' ? 24 : size == 'small' ? 19 : size == 'big' ? 28 : 40,
      color: theme === 'dark' ? colors.black : colors.white,
    },
  });
