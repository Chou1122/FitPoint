import React from 'react';
import Svg, {Circle, G, Path} from 'react-native-svg';
import {StyleIcon} from '../icon';

export const IconBrazil = ({height, width, color}: StyleIcon) => {
  return (
    <Svg
      width={height || 800}
      height={width || 800}
      viewBox="0 0 36 36"
      preserveAspectRatio="xMidYMid meet">
      <Path
        fill="#009B3A"
        d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"
      />
      <Path fill="#FEDF01" d="M32.728 18L18 29.124 3.272 18 18 6.875z" />
      <Circle fill="#002776" cx={17.976} cy={17.924} r={6.458} />
      <Path
        fill="#CBE9D4"
        d="M12.277 14.887a6.406 6.406 0 0 0-.672 2.023c3.995-.29 9.417 1.891 11.744 4.595.402-.604.7-1.28.883-2.004-2.872-2.808-7.917-4.63-11.955-4.614z"
      />
      <Path fill="#88C9F9" d="M12 18.233h1v1h-1zm1 2h1v1h-1z" />
      <Path
        fill="#55ACEE"
        d="M15 18.233h1v1h-1zm2 1h1v1h-1zm4 2h1v1h-1zm-3 1h1v1h-1zm3-6h1v1h-1z"
      />
      <Path fill="#3B88C3" d="M19 20.233h1v1h-1z" />
    </Svg>
  );
};
