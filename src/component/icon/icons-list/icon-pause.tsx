import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {StyleIcon} from '../icon';

export const IconPause = ({height, width, color}: StyleIcon) => {
  return (
    <Svg width={width} height={height} viewBox="-1 0 8 8">
      <G
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd">
        <G
          id="Dribbble-Light-Preview"
          transform="translate(-227.000000, -3765.000000)"
          fill={color || '#000000'}>
          <G id="icons" transform="translate(56.000000, 160.000000)">
            <Path
              d="M172,3605 C171.448,3605 171,3605.448 171,3606 L171,3612 C171,3612.552 171.448,3613 172,3613 C172.552,3613 173,3612.552 173,3612 L173,3606 C173,3605.448 172.552,3605 172,3605 M177,3606 L177,3612 C177,3612.552 176.552,3613 176,3613 C175.448,3613 175,3612.552 175,3612 L175,3606 C175,3605.448 175.448,3605 176,3605 C176.552,3605 177,3605.448 177,3606"
              id="pause-[#1006]"></Path>
          </G>
        </G>
      </G>
    </Svg>
  );
};
