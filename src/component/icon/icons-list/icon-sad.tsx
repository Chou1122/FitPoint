import React from 'react';
import Svg, {Circle, Line, Path} from 'react-native-svg';
import {StyleIcon} from '../icon';

export const IconSad = ({height, width, color}: StyleIcon) => {
  return (
    <Svg
      width={width || '800px'}
      height={height || '800px'}
      viewBox="0 0 27 27"
      aria-labelledby="sadFaceIconTitle"
      stroke={color || '#000000'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      color={color || '#000000'}>
      <Line strokeLinecap="round" x1="9" y1="9" x2="9" y2="9" />
      <Line strokeLinecap="round" x1="15" y1="9" x2="15" y2="9" />
      <Path d="M8,16 C9.33333333,15.3333333 10.6656028,15.0003822 11.9968085,15.0011466 C13.3322695,15.0003822 14.6666667,15.3333333 16,16" />
      <Circle cx="12" cy="12" r="10" />
    </Svg>
  );
};
