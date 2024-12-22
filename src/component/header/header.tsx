import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {CustomText as Text} from '../text-custom/text-custom';
import {theme} from '../../hooks/theme/theme';
import useAppNavigation from '../../hooks/navigation/use-navigation';
import {Icon, IconName} from '../icon/icon';

const {colors} = theme;

const heightHeader = 60;

export interface HeaderProps {
  btnGoBack?: boolean;
  title?: string;
}

export const Header = ({btnGoBack = true, title}: HeaderProps) => {
  const navigation = useAppNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {btnGoBack && (
        <TouchableOpacity style={styles.btnGoBack} onPress={handleGoBack}>
          <Icon
            name={IconName['icon-back']}
            style={{height: 20, width: 20, color: colors.white}}
          />
        </TouchableOpacity>
      )}
      {title && (
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: heightHeader,
    width: '100%',
    backgroundColor: colors.header,
    flexDirection: 'row',
    paddingHorizontal: 4,
    // iOS shadow
    shadowColor: '#000', // Color of the shadow
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.5, // Blur radius of the shadow
    // Android shadow
    elevation: 8, // Elevation for Android
  },
  btnGoBack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 8,
    paddingLeft: 8,
  },
  textGoBack: {
    color: colors.white,
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  titleText: {
    color: colors.white,
    textAlign: 'left',
  },
});
