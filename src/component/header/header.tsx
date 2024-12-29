import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {CustomText as Text} from '../text-custom/text-custom';
import {theme} from '../../hooks/theme/theme';
import useAppNavigation from '../../hooks/navigation/use-navigation';
import {Icon, IconName} from '../icon/icon';
import {Logo} from '../logo/logo';

const {colors} = theme;

const heightHeader = 60;

export interface HeaderProps {
  onBack?: () => void;
  btnGoBack?: boolean;
  title?: string;
}

export const Header = ({btnGoBack = true, title, onBack}: HeaderProps) => {
  const navigation = useAppNavigation();

  const handleGoBack = () => {
    !onBack ? navigation.goBack() : onBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnWrapper}>
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

      <View style={styles.logoWrapper}>
        <Logo theme={'light'} size={'normal'} />
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnWrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  btnGoBack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
  },
  textGoBack: {
    color: colors.white,
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 16,
  },
  titleText: {
    color: colors.white,
    textAlign: 'left',
  },
  logoWrapper: {
    marginRight: 8,
  },
});
