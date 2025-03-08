import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {CustomText as Text} from '../../component/text-custom/text-custom';
import {Header} from '../../component/header/header';
import {theme} from '../../hooks/theme/theme';
import useAppNavigation from '../../hooks/navigation/use-navigation';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';
import {handleRecordingFinished} from './upload-record';
import {mockTips} from './mock-tip';
import {Icon, IconName} from '../../component/icon/icon';
import {useSelector} from 'react-redux';
import {formatTime} from '../../helpers/time.helper';

const {colors, font, space} = theme;

export const SportRecording = (props: any) => {
  const {id: sportId, time, img, name} = props.route.params;

  const device = useCameraDevice('back');

  const cameraRef = useRef<Camera | null>(null);
  const navigation = useAppNavigation();
  const userInfo = useSelector((state: any) => state.userInfo);

  const [isRecording, setIsRecording] = useState(false);
  const [isCountdown, setIsCountdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countDown, setCountDown] = useState<number>(-1);
  const [tipList, setTipList] = useState(mockTips);
  const [cameraAccess, setCameraAccess] = useState<boolean>(false);

  const requestCameraPermission = async () => {
    try {
      const result = await check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA,
      );

      if (result === RESULTS.DENIED) {
        const requestResult = await request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA,
        );

        if (requestResult === RESULTS.GRANTED) {
          setCameraAccess(true);
        } else {
          setCameraAccess(false);
        }
      } else if (result === RESULTS.GRANTED) {
        setCameraAccess(true);
      } else {
        Alert.alert('Warning', 'Can not access your camera!');
      }
    } catch (error) {
      console.error('Error request:', error);
    }
  };

  useEffect(() => {
    setTimeout(() => requestCameraPermission(), 500);
  }, []);

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
      onRecordingFinished: async video =>
        handleRecordingFinished(
          video,
          setIsRecording,
          setIsLoading,
          navigation,
          userInfo.id,
          sportId,
          img,
          time,
          name,
        ),
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
  };

  const renderTip = (item: any) => {
    return (
      <View style={styles.tipWrapper} key={item}>
        <View style={styles.dot} />
        <Text style={styles.tipText}>{`${item}`}</Text>
      </View>
    );
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraWrapper}>
        {device && (
          <Camera
            video={true}
            style={styles.camera}
            device={device}
            isActive={true}
            ref={cameraRef}
          />
        )}

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
    );
  };

  const renderMockCamera = useCallback(() => {
    return (
      <View style={styles.cameraWrapper}>
        <View style={styles.mockCamera} />

        <TouchableWithoutFeedback
          style={styles.warningW}
          onPress={requestCameraPermission}>
          <View style={styles.warningW}>
            <Icon
              name={IconName['icon-camera-slash']}
              style={{color: colors.gray3, width: 80, height: 80}}
            />
            <Text style={styles.textW}>
              Camera access is required to record. Please enable camera
              permissions in your device settings to continue.
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }, [styles]);

  return (
    <View style={styles.container}>
      <Header title={'Workout Recording'} />

      {isLoading ? (
        <View style={styles.loadingCon}>
          <ActivityIndicator size={60} style={{opacity: 1}} />
        </View>
      ) : null}

      <Text style={styles.labelSport}>{name}</Text>
      <Text style={styles.timeText}>{`Estimate time: ${formatTime(
        time,
      )}`}</Text>

      {cameraAccess ? <>{renderCamera()}</> : <>{renderMockCamera()}</>}

      <TouchableOpacity
        disabled={isCountdown || !cameraAccess}
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
  warningW: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  textW: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify',
    paddingHorizontal: 20,
  },
  cameraWrapper: {
    flex: 1,
  },
  camera: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  mockCamera: {
    flex: 1,
    backgroundColor: colors.black,
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
