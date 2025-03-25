import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {theme} from '../../hooks/theme/theme';
import {Icon, IconName} from '../icon/icon';
import {ScrollView} from 'react-native-gesture-handler';

const {colors} = theme;

export interface DropDownItem {
  value: any;
  name: string;
  icon?: any;
}

interface DropDownPickerProps {
  isDisable?: boolean;
  initialValue?: any;
  listItem: DropDownItem[];
  styleContainer?: ViewStyle;
  placeholder?: string;
  onChangeValue?: (value: any) => void;
  maxHeightDropDown?: number;
}

export const DropDownPicker = ({
  isDisable = false,
  listItem,
  initialValue,
  placeholder = 'Select value',
  styleContainer = {},
  onChangeValue,
  maxHeightDropDown = 200,
}: DropDownPickerProps) => {
  const styles = createStyle(styleContainer, maxHeightDropDown);

  const [val, setVal] = useState<any>(initialValue);
  const [render, setRender] = useState<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!listItem) return;

    const index = listItem.findIndex(item => item.value == val);
    if (index !== -1) {
      setRender(index);
    } else {
      setRender(null);
    }
  }, [val, listItem]);

  const handleDropDownPress = () => {
    setIsOpen(!isOpen);
  };

  const handlePressItem = (item: DropDownItem) => {
    setVal(item.value);
    setIsOpen(false);
    onChangeValue && onChangeValue(item.value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.body}
        onPress={handleDropDownPress}
        disabled={isDisable}>
        <View style={styles.content}>
          {listItem[render]?.icon ? listItem[render]?.icon : null}
          <Text style={[val != null ? null : styles.textHolder]}>
            {val != null ? listItem[render]?.name : placeholder}
          </Text>
        </View>

        <Icon
          style={styles.icon}
          name={isOpen ? IconName['icon-up'] : IconName['icon-down']}
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropDownWrapper}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{flexGrow: 1}}>
            {listItem.map((item, index) => (
              <TouchableOpacity
                style={styles.itemList}
                key={index.toString()}
                onPress={() => handlePressItem(item)}>
                {item.icon ? item.icon : null}
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const createStyle = (styleContainer: ViewStyle, maxHeightDropDown: number) =>
  StyleSheet.create({
    container: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.gray3,
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      ...styleContainer,
    },
    textHolder: {
      color: colors.gray3,
    },
    body: {
      height: 40,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      flex: 1,
    },
    icon: {
      width: 20,
      height: 20,
    },
    dropDownWrapper: {
      width: '100%',
      backgroundColor: 'white',
      borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8,
      elevation: 5,
      zIndex: 100,
      maxHeight: maxHeightDropDown,
    },
    itemList: {
      height: 40,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      borderTopWidth: 0.8,
      borderColor: colors.gray3,
      gap: 12,
    },
  });
