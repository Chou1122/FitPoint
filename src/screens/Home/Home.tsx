import React, {Button, ScrollView, StyleSheet, View} from 'react-native';
import useAppNavigation from '../../hooks/navigation/use-navigation';
import {CustomText as Text} from '../../component/text-custom/text-custom';
import {Header} from '../../component/header/header';
import {theme} from '../../hooks/theme/theme';

const {colors} = theme;

export const Home = () => {
  const navigation = useAppNavigation();

  return (
    <View style={styles.container}>
      <Header title={'Select your sport'} />
      <ScrollView></ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
