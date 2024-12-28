import React, {useRef, useState} from 'react';
import {Header} from '../../component/header/header';
import {CustomText as Text} from '../../component/text-custom/text-custom';
import {theme} from '../../hooks/theme/theme';
import {Icon, IconName} from '../../component/icon/icon';
import {StyleSheet, View} from 'react-native';
import useAppNavigation from '../../hooks/navigation/use-navigation';
import {RNCamera} from 'react-native-camera';

const {colors, space, font} = theme;

export const SportRecording = () => {
  const navigation = useAppNavigation();

  const cameraRef = useRef(null);
  const [recording, setRecording] = useState(false);

  return (
    <View style={styles.container}>
      <Header title={'Record Your Workout'} />
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        // type={RNCamera.Constants.Type.back}
        // flashMode={RNCamera.Constants.FlashMode.off}
        // androidCameraPermissionOptions={{
        //   title: 'Cấp quyền sử dụng Camera',
        //   message: 'Ứng dụng cần quyền sử dụng camera để quay video',
        //   buttonPositive: 'Đồng ý',
        //   buttonNegative: 'Hủy',
        // }}
        // androidRecordAudioPermissionOptions={{
        //   title: 'Cấp quyền thu âm',
        //   message: 'Ứng dụng cần quyền sử dụng micro để ghi âm',
        //   buttonPositive: 'Đồng ý',
        //   buttonNegative: 'Hủy',
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    height: 40,
    width: 40,
    color: '#fff',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
