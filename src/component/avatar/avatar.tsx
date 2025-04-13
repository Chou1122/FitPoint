import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {theme} from '../../hooks/theme/theme';
import {Icon, IconName} from '../icon/icon';

const {space, colors} = theme;

interface AvatarProps {
  height?: number;
  width?: number;
  borderRadius?: number;
  source?: string;
  editable?: boolean;
  onEditPress?: () => void;
}

export const Avatar = ({
  borderRadius = 100,
  height = space.avtNormal,
  width = space.avtNormal,
  source,
  editable = false,
  onEditPress,
}: AvatarProps) => {
  const styles = creatStyle(width, height);

  const handleEditPress = () => {
    onEditPress && onEditPress();
  };

  return (
    <View
      style={[
        {
          borderRadius: borderRadius,
          height: height,
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: height / 30,
        },
      ]}>
      {editable && (
        <TouchableOpacity style={styles.editWrapper} onPress={handleEditPress}>
          <Icon name={IconName['icon-edit']} style={styles.icon} />
        </TouchableOpacity>
      )}
      {!source ? (
        <Icon
          name={IconName['icon-mock-avt']}
          style={{height: (height * 90) / 100, width: (width * 90) / 100}}
        />
      ) : (
        <View
          style={{
            height: (height * 90) / 100,
            width: (width * 90) / 100,
            overflow: 'hidden',
            borderRadius: 1000,
          }}>
          <Image
            source={{
              uri: source,
            }}
            style={styles.imgWrapper}
          />
        </View>
      )}
    </View>
  );
};

const creatStyle = (width: number, height: number) =>
  StyleSheet.create({
    editWrapper: {
      position: 'absolute',
      backgroundColor: colors.white,
      width: (width * 24) / 100,
      aspectRatio: 1,
      zIndex: 100,
      justifyContent: 'center',
      alignItems: 'center',
      left: (width * 70) / 100,
      top: (height * 70) / 100,
      borderRadius: 1000,
      borderWidth: height / 50,
      borderColor: colors.black,
    },
    icon: {
      height: (height * 16) / 100,
      width: (width * 16) / 100,
      color: colors.blue2,
    },
    imgWrapper: {
      height: '100%',
      width: '100%',
    },
  });
