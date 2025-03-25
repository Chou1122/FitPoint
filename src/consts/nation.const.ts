import {IconName} from '../component/icon/icon';

export enum Nation {
  VietNam = 1,
  China,
  Japan,
  Brazil,
  Russia,
}

export const NationText = {
  [Nation.VietNam]: 'Viet Nam',
  [Nation.China]: 'China',
  [Nation.Japan]: 'Japan',
  [Nation.Brazil]: 'Brazil',
  [Nation.Russia]: 'Russia',
};

export const NationIcon = {
  [Nation.VietNam]: IconName['vietnam'],
  [Nation.China]: IconName['china'],
  [Nation.Japan]: IconName['japan'],
  [Nation.Brazil]: IconName['brazil'],
  [Nation.Russia]: IconName['russia'],
};
