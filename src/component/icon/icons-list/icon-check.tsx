import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {StyleIcon} from '../icon';

export const IconCheck = ({height, width, color}: StyleIcon) => {
  return (
    <Svg
      fill={color || '#000000'}
      width={width || '800px'}
      height={height || '800px'}
      viewBox="0 0 1920 1920">
      <Path
        d="M1743.858 267.012 710.747 1300.124 176.005 765.382 0 941.387l710.747 710.871 1209.24-1209.116z"
        fill-rule="evenodd"
      />
    </Svg>
  );
};
