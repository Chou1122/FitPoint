import React from 'react';
import {IconBack} from './icons-list/icon-back';
import {IconPause} from './icons-list/icon-pause';
import {IconPlay} from './icons-list/icon-play';

import {View, ViewProps} from 'react-native';

export enum IconName {
  'icon-back',
  'icon-pause',
  'icon-play',
}

export interface StyleIcon extends ViewProps {
  height?: number;
  width?: number;
  color?: string;
}

export interface IconProps {
  name: IconName;
  style?: StyleIcon;
}

export const Icon = ({name, style = {}}: IconProps) => {
  return (
    <View>
      {name === IconName['icon-back'] ? (
        <IconBack {...style} />
      ) : name === IconName['icon-pause'] ? (
        <IconPause {...style} />
      ) : name === IconName['icon-play'] ? (
        <IconPlay {...style} />
      ) : null}
    </View>
  );
};
