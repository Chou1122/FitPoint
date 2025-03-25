import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {StyleIcon} from '../icon';

export const IconVietNam = ({height, width, color}: StyleIcon) => {
  return (
    <Svg
      width={height || 800}
      height={width || 800}
      viewBox="0 0 36 36"
      preserveAspectRatio="xMidYMid meet">
      <Path
        fill="#DA251D"
        d="M32 5H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"
      />
      <Path
        fill="#FF0"
        d="M19.753 16.037L18 10.642l-1.753 5.395h-5.672l4.589 3.333l-1.753 5.395L18 21.431l4.589 3.334l-1.753-5.395l4.589-3.333z"
      />
    </Svg>
  );
};
