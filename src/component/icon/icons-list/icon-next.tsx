import React from 'react';
import Svg, {Circle, G, Path, Polygon} from 'react-native-svg';
import {StyleIcon} from '../icon';

export const IconNext = ({height, width, color}: StyleIcon) => {
  return (
    <Svg
      fill={color || '#000000'}
      height={height || '800px'}
      width={width || '800px'}
      viewBox="0 0 24 24">
      <G>
        <G>
          <Polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12 		" />
        </G>
      </G>
    </Svg>
  );
};
