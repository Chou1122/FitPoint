import React from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardDissMissView} from '../../component/keyboardDismissView/keyboard-dissmiss-view';

export const SignUp = () => {
  return (
    <KeyboardDissMissView>
      <View style={styles.contanier}></View>
    </KeyboardDissMissView>
  );
};

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
