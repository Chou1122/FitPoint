import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {StyleIcon} from '../icon';

export const IconPlay = ({height, width, color}: StyleIcon) => {
  return (
    <Svg
      width={width || '800px'}
      height={height || '800px'}
      viewBox="-3 0 28 28">
      <G
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd">
        <G
          id="Icon-Set-Filled"
          transform="translate(-419.000000, -571.000000)"
          fill={color || '#000000'}>
          <Path d="M440.415,583.554 L421.418,571.311 C420.291,570.704 419,570.767 419,572.946 L419,597.054 C419,599.046 420.385,599.36 421.418,598.689 L440.415,586.446 C441.197,585.647 441.197,584.353 440.415,583.554"></Path>
        </G>
      </G>
    </Svg>
  );
};
