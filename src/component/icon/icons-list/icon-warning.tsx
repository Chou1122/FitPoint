import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {StyleIcon} from '../icon';

export const IconWarning = ({height, width, color}: StyleIcon) => {
  return (
    <Svg
      width={width || '800px'}
      height={height || '800px'}
      viewBox="0 0 1024 1024">
      <Path
        fill={color || '#000000'}
        d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm48-176a48 48 0 1 1-96 0 48 48 0 0 1 96 0zm-48-464a32 32 0 0 1 32 32v288a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32z"
      />
    </Svg>
  );
};
