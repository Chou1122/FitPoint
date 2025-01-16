import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export const PopUpSuccessChangePass = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/lotties/success2.json')}
        autoPlay
        loop={false}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  animation: {
    height: 152,
    width: 152,
  },
});
