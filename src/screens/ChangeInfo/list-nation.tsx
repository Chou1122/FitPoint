import {StyleSheet} from 'react-native';
import {DropDownItem} from '../../component/dropdownpicker/dropdownpicker';
import {Icon, IconName} from '../../component/icon/icon';
import {Nation, NationText} from '../../consts/nation.const';

const styles = StyleSheet.create({
  iconFlag: {
    height: 20,
    width: 30,
  },
});

export const ListNation: DropDownItem[] = [
  {
    value: Nation.VietNam,
    name: NationText[Nation.VietNam],
    icon: <Icon name={IconName['vietnam']} style={styles.iconFlag} />,
  },
  {
    value: Nation.China,
    name: NationText[Nation.China],
    icon: <Icon name={IconName['china']} style={styles.iconFlag} />,
  },
  {
    value: Nation.Japan,
    name: NationText[Nation.Japan],
    icon: <Icon name={IconName['japan']} style={styles.iconFlag} />,
  },
  {
    value: Nation.Brazil,
    name: NationText[Nation.Brazil],
    icon: <Icon name={IconName['brazil']} style={styles.iconFlag} />,
  },
  {
    value: Nation.Russia,
    name: NationText[Nation.Russia],
    icon: <Icon name={IconName['russia']} style={styles.iconFlag} />,
  },
];
