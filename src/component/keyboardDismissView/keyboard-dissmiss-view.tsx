import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

interface Props {
  children: any;
}

export const KeyboardDissMissView = ({children}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
  );
};
