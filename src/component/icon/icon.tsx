import React from 'react';
import {IconBack} from './icons-list/icon-back';
import {IconPause} from './icons-list/icon-pause';
import {IconPlay} from './icons-list/icon-play';
import {IconVeryHappy} from './icons-list/icon-very-happy';
import {IconHappy} from './icons-list/icon-happy';
import {IconNeutral} from './icons-list/icon-neutral';
import {IconSad} from './icons-list/icon-sad';
import {IconVerySad} from './icons-list/icon-very-sad';
import {IconHandWithWeight} from './icons-list/icon-hand-with-weight';
import {IconHome} from './icons-list/icon-home';

import {View, ViewProps} from 'react-native';
import {IconProfile} from './icons-list/icon-profile';

export enum IconName {
  'icon-back',
  'icon-pause',
  'icon-play',
  'icon-very-happy',
  'icon-happy',
  'icon-neutral',
  'icon-sad',
  'icon-very-sad',
  'icon-hand-with-weight',
  'icon-home',
  'icon-profile',
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
      ) : name === IconName['icon-very-happy'] ? (
        <IconVeryHappy {...style} />
      ) : name === IconName['icon-happy'] ? (
        <IconHappy {...style} />
      ) : name === IconName['icon-neutral'] ? (
        <IconNeutral {...style} />
      ) : name === IconName['icon-sad'] ? (
        <IconSad {...style} />
      ) : name === IconName['icon-very-sad'] ? (
        <IconVerySad {...style} />
      ) : name === IconName['icon-hand-with-weight'] ? (
        <IconHandWithWeight {...style} />
      ) : name === IconName['icon-home'] ? (
        <IconHome {...style} />
      ) : name === IconName['icon-profile'] ? (
        <IconProfile {...style} />
      ) : null}
    </View>
  );
};
