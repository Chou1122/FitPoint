import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {StyleIcon} from '../icon';

export const IconChina = ({height, width, color}: StyleIcon) => {
  return (
    <Svg
      width={height || 800}
      height={width || 800}
      viewBox="0 0 36 36"
      preserveAspectRatio="xMidYMid meet">
      <Path
        fill="#DE2910"
        d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"
      />
      <Path
        fill="#FFDE02"
        d="M11.136 8.977l.736.356l.589-.566l-.111.81l.72.386l-.804.144l-.144.804l-.386-.72l-.81.111l.566-.589zm4.665 2.941l-.356.735l.566.59l-.809-.112l-.386.721l-.144-.805l-.805-.144l.721-.386l-.112-.809l.59.566zm-.957 3.779l.268.772l.817.017l-.651.493l.237.783l-.671-.467l-.671.467l.236-.783l-.651-.493l.817-.017zm-3.708 3.28l.736.356l.589-.566l-.111.81l.72.386l-.804.144l-.144.804l-.386-.72l-.81.111l.566-.589zM7 10.951l.929 2.671l2.826.058l-2.253 1.708l.819 2.706L7 16.479l-2.321 1.615l.819-2.706l-2.253-1.708l2.826-.058z"
      />
    </Svg>
  );
};
