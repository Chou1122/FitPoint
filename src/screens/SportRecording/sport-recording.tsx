import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {CustomText as Text} from '../../component/text-custom/text-custom';
import {Header} from '../../component/header/header';
import {theme} from '../../hooks/theme/theme';
import useAppNavigation from '../../hooks/navigation/use-navigation';

const {colors, font, space} = theme;

const mockTips = [
  'Clear obstacles to avoid accidents.',
  'Ensure good lighting and camera setup.',
  'Stretch before starting.',
  'Wear comfy clothes and prep equipment.',
  'Check battery and storage.',
  'Ensure the space is appropriate for recording.',
];

export const SportRecording = () => {
  const device = useCameraDevice('back');
  const {hasPermission} = useCameraPermission();
  const cameraRef = useRef<Camera | null>(null);
  const navigation = useAppNavigation();

  const [isRecording, setIsRecording] = useState(false);
  const [isCountdown, setIsCountdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [countDown, setCountDown] = useState<number>(-1);
  const [tipList, setTipList] = useState(mockTips);

  if (device == null) return <View style={styles.container} />;
  if (!hasPermission) return <View style={styles.container} />;

  const handlePressBtn = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startCountdown();
    }
  };

  const startCountdown = () => {
    setCountDown(3);
    setIsCountdown(true);
    const interval = setInterval(() => {
      setCountDown(prev => {
        if (prev === 0) {
          clearInterval(interval);
          setIsCountdown(false);
          startRecording();
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startRecording = async () => {
    if (cameraRef.current == null) return;
    setIsRecording(true);
    await cameraRef.current.startRecording({
      onRecordingFinished: video => {
        console.log('Video file saved at:', video.path);
        setIsRecording(false);
      },
      onRecordingError: error => {
        console.error('Recording error:', error);
        setIsRecording(false);
      },
    });
  };

  const stopRecording = async () => {
    if (cameraRef.current == null) return;
    await cameraRef.current.stopRecording();
    setIsRecording(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('RecordResult');
    }, 3000);
  };

  const renderTip = (item: any) => {
    return (
      <View style={styles.tipWrapper}>
        <View style={styles.dot} />
        <Text style={styles.tipText}>{`${item}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={'Workout Recording'} />

      {isLoading ? (
        <View style={styles.loadingCon}>
          <ActivityIndicator size={60} style={{opacity: 1}} />
        </View>
      ) : null}

      <Text style={styles.labelSport}>Push Up</Text>
      <Text style={styles.timeText}>Estimate time: 1 minute</Text>

      <View style={styles.cameraWrapper}>
        <Camera
          video={true}
          style={styles.camera}
          device={device}
          isActive={true}
          ref={cameraRef}
        />
        {!isRecording && !isCountdown && (
          <View style={styles.tipCamera}>
            <Text style={styles.labelTip}>Recording Tip:</Text>
            {tipList.map(item => renderTip(item))}
          </View>
        )}
        {isCountdown && (
          <View style={styles.countdownWrapper}>
            <Text style={styles.countdownText}>
              {countDown >= 1 ? countDown : 'Start!'}
            </Text>
          </View>
        )}
        {isRecording && (
          <View style={styles.tipCamera}>
            <Text style={styles.tipText}>
              Be sure to keep the camera still while recording.
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        disabled={isCountdown}
        style={[styles.btnStartWrapper, isCountdown && styles.btnDisabled]}
        onPress={handlePressBtn}>
        <Text style={styles.textBtnStart}>
          {isRecording || isCountdown ? 'Submit the video' : 'Start recording'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraWrapper: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  labelSport: {
    textAlign: 'left',
    paddingHorizontal: 16,
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 24,
    marginTop: 8,
    marginBottom: 4,
  },
  timeText: {
    textAlign: 'left',
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 8,
  },
  textBtnStart: {
    color: colors.white,
    fontSize: font.fontBtnBottom,
  },
  btnStartWrapper: {
    height: 48,
    backgroundColor: colors.header,
    justifyContent: 'center',
    marginBottom: space.marginBottomBtn,
    marginHorizontal: space.marginHorizontalBtn,
    marginTop: 16,
    borderRadius: 8,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  tipCamera: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  labelTip: {
    textAlign: 'left',
    fontSize: 18,
    lineHeight: 22,
    color: colors.white,
  },
  tipText: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'left',
  },
  tipWrapper: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 4,
    width: 4,
    borderRadius: 100,
    backgroundColor: colors.white,
    marginRight: 8,
  },
  countdownWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    lineHeight: 80,
  },
  loadingCon: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    width: '100%',
    height: '100%',
    backgroundColor: colors.black,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
