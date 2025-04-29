import React from 'react';
import Svg, {Circle, G, Path, Polygon, Polyline} from 'react-native-svg';
import {StyleIcon} from '../icon';

export const IconPrevious = ({height, width, color}: StyleIcon) => {
  return (
    <Svg
      width={width || '800px'}
      height={height || '800px'}
      viewBox="0 0 24 24">
      <Polyline
        fill="none"
        stroke={color || '#000000'}
        strokeWidth="2"
        points="7 2 17 12 7 22"
        transform="matrix(-1 0 0 1 24 0)"
      />
    </Svg>
  );
};
