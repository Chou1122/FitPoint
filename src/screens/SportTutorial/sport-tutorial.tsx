import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from '../../component/header/header';

export const SportTutorial = () => {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
