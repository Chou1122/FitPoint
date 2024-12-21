import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomText as Text} from '../text-custom/text-custom';

const heightHeader = 72;

export const Header = () => {
  return (
    <View style={styles.container}>
      <Text>absadasd</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: heightHeader,
    width: '100%',
    backgroundColor: 'blue',
  },
});
