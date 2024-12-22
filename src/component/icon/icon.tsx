import React from 'react';
import {IconBack} from './icons-list/icon-back';
import {View, ViewProps} from 'react-native';

export enum IconName {
  'icon-back',
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
    <View>{name === IconName['icon-back'] && <IconBack {...style} />}</View>
  );
};
