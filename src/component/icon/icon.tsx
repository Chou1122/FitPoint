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
import {IconMockAvt} from './icons-list/icon-mock-avt';
import {View, ViewProps} from 'react-native';
import {IconProfile} from './icons-list/icon-profile';
import {IconEdit} from './icons-list/icon-edit';
import {IconEmail} from './icons-list/icon-email';
import {IconPhone} from './icons-list/icon-phone';
import {IconAddress} from './icons-list/icon-address';
import {IconGender} from './icons-list/icon-gender';
import {IconTime} from './icons-list/icon-time';
import {IconEarth} from './icons-list/icon-earth';
import {IconEyeOpen} from './icons-list/icon-eye-open';
import {IconEyeClose} from './icons-list/icon-eye.close';
import {IconWarning} from './icons-list/icon-warning';
import {IconTrophy} from './icons-list/icon-trophy';
import {IconTrophyStar} from './icons-list/icon-trophy-star';
import {IconSuccess} from './icons-list/icon-success';
import {IconCheck} from './icons-list/icon-check';
import {IconCameraSlash} from './icons-list/icon-camera-slash';
import {IconUp} from './icons-list/icon-up';
import {IconDown} from './icons-list/icon-down';
import {IconStatic} from './icons-list/icon-static';
import {IconCalendar} from './icons-list/icon-calendar';
import {IconNext} from './icons-list/icon-next';
import {IconPrevious} from './icons-list/icon-previous';

import {IconVietNam} from './icons-list/icon-vietnam';
import {IconChina} from './icons-list/icon-china';
import {IconJapan} from './icons-list/icon-japan';
import {IconRussia} from './icons-list/icon-russia';
import {IconBrazil} from './icons-list/icon-brazil';

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
  'icon-mock-avt',
  'icon-edit',
  'icon-email',
  'icon-phone',
  'icon-address',
  'icon-gender',
  'icon-time',
  'icon-earth',
  'icon-eye-open',
  'icon-eye-close',
  'icon-warning',
  'icon-trophy',
  'icon-trophy-star',
  'icon-success',
  'icon-check',
  'icon-camera-slash',
  'icon-up',
  'icon-down',
  'icon-static',
  'icon-calendar',
  'icon-next',
  'icon-previous',

  'vietnam',
  'china',
  'japan',
  'russia',
  'brazil',
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
      ) : name === IconName['icon-mock-avt'] ? (
        <IconMockAvt {...style} />
      ) : name === IconName['icon-edit'] ? (
        <IconEdit {...style} />
      ) : name === IconName['icon-email'] ? (
        <IconEmail {...style} />
      ) : name === IconName['icon-phone'] ? (
        <IconPhone {...style} />
      ) : name === IconName['icon-address'] ? (
        <IconAddress {...style} />
      ) : name === IconName['icon-gender'] ? (
        <IconGender {...style} />
      ) : name === IconName['icon-time'] ? (
        <IconTime {...style} />
      ) : name === IconName['icon-earth'] ? (
        <IconEarth {...style} />
      ) : name === IconName['icon-eye-open'] ? (
        <IconEyeOpen {...style} />
      ) : name === IconName['icon-eye-close'] ? (
        <IconEyeClose {...style} />
      ) : name === IconName['icon-warning'] ? (
        <IconWarning {...style} />
      ) : name === IconName['icon-trophy'] ? (
        <IconTrophy {...style} />
      ) : name === IconName['icon-trophy-star'] ? (
        <IconTrophyStar {...style} />
      ) : name === IconName['icon-success'] ? (
        <IconSuccess {...style} />
      ) : name === IconName['icon-check'] ? (
        <IconCheck {...style} />
      ) : name === IconName['icon-camera-slash'] ? (
        <IconCameraSlash {...style} />
      ) : name === IconName['icon-up'] ? (
        <IconUp {...style} />
      ) : name === IconName['icon-down'] ? (
        <IconDown {...style} />
      ) : name === IconName['vietnam'] ? (
        <IconVietNam {...style} />
      ) : name === IconName['china'] ? (
        <IconChina {...style} />
      ) : name === IconName['japan'] ? (
        <IconJapan {...style} />
      ) : name === IconName['russia'] ? (
        <IconRussia {...style} />
      ) : name === IconName['brazil'] ? (
        <IconBrazil {...style} />
      ) : name === IconName['icon-static'] ? (
        <IconStatic {...style} />
      ) : name === IconName['icon-calendar'] ? (
        <IconCalendar {...style} />
      ) : name === IconName['icon-next'] ? (
        <IconNext {...style} />
      ) : name === IconName['icon-previous'] ? (
        <IconPrevious {...style} />
      ) : null}
    </View>
  );
};
