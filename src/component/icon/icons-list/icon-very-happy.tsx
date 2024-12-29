import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {StyleIcon} from '../icon';

export const IconVeryHappy = ({height, width, color}: StyleIcon) => {
  return (
    <Svg
      fill={color || '#000000'}
      width={width || '800px'}
      height={height || '800px'}
      viewBox="0 0 24 24">
      <Path d="M12 18c4 0 5-4 5-4H7s1 4 5 4z" />
      <Path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
      <Path d="m13 12 2 .012c.012-.462.194-1.012 1-1.012s.988.55 1 1h2c0-1.206-.799-3-3-3s-3 1.794-3 3zm-5-1c.806 0 .988.55 1 1h2c0-1.206-.799-3-3-3s-3 1.794-3 3l2 .012C7.012 11.55 7.194 11 8 11z" />
    </Svg>
  );
};
