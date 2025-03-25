import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {StyleIcon} from '../icon';

export const IconRussia = ({height, width, color}: StyleIcon) => {
  return (
    <Svg
      width={height || 800}
      height={width || 800}
      viewBox="0 0 36 36"
      preserveAspectRatio="xMidYMid meet">
      <Path fill="#CE2028" d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-4h36v4z" />
      <Path fill="#22408C" d="M0 13h36v10H0z" />
      <Path fill="#EEE" d="M32 5H4a4 4 0 0 0-4 4v4h36V9a4 4 0 0 0-4-4z" />
    </Svg>
  );
};
