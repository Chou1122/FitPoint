import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {StyleIcon} from '../icon';

export const IconHappy = ({height, width, color}: StyleIcon) => {
  return (
    <Svg
      fill={color || '#000000'}
      width={width || '800px'}
      height={height || '800px'}
      viewBox="0 0 24 24">
      <Path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
      <Circle cx="8.5" cy="10.5" r="1.5" />
      <Circle cx="15.493" cy="10.493" r="1.493" />
      <Path d="M12 18c4 0 5-4 5-4H7s1 4 5 4z" />
    </Svg>
  );
};
