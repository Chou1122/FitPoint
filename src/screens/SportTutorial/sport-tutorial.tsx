import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Header} from '../../component/header/header';
import {CustomText as Text} from '../../component/text-custom/text-custom';
import Video, {VideoRef} from 'react-native-video';
import {theme} from '../../hooks/theme/theme';
import {Icon, IconName} from '../../component/icon/icon';
import useAppNavigation from '../../hooks/navigation/use-navigation';

const {colors, space, font} = theme;

const mockTip = [
  'Always keep your back straight to avoid injury.',
  'Inhale when lowering your body and exhale when pushing up.',
  'Do a 5-minute warm-up to prepare your muscles.',
  'Tighten your abdominal muscles for better stability.',
  'Avoid rushing; slow and steady wins the race.',
  'Take a 30-second rest after every 10 repetitions.',
  'Drink water before and after the session.',
  'Aim for a specific number of repetitions and gradually increase.',
  'Stop immediately if you feel pain or discomfort.',
  'Wear comfortable clothes and supportive shoes.',
];

export const SportTutorial = () => {
  const navigation = useAppNavigation();

  const videoRef = useRef<VideoRef>(null);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isShowPause, setIsShowPause] = useState<boolean>(false);
  const [opacityIcon, setOpacityIcon] = useState<number>(1);
  const [tipList, setTipList] = useState<string[]>(mockTip);

  const handleVideoPress = () => {
    setIsPaused(!isPaused);
    setOpacityIcon(1);

    if (isPaused) {
      setIsShowPause(true);

      setTimeout(() => {
        let interval = setInterval(() => {
          setOpacityIcon(prevOpacity => {
            if (prevOpacity <= 0) {
              clearInterval(interval);
              return 0;
            }
            return prevOpacity - 0.2;
          });
        }, 100);
      }, 500);

      setTimeout(() => {
        setIsShowPause(false);
      }, 1000);
    } else {
      setIsShowPause(false);
    }
  };

  const handleVideoEnd = () => {
    videoRef.current?.seek(0);
    setIsPaused(true);
    setOpacityIcon(1);
  };

  const handleStartPress = () => {
    navigation.navigate('SportRecording');
  };

  const renderTip = (item: any) => {
    return (
      <View>
        <Text style={styles.tipText}>{`- ${item}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Tutorial" />
      <View style={styles.nameSportWrapper}>
        <Text style={styles.nameText}>Push Up</Text>
        <Text style={styles.timeText}>Estimate time: 1 minute</Text>
      </View>
      <TouchableOpacity style={styles.videoWrapper} onPress={handleVideoPress}>
        {isShowPause || isPaused ? (
          <View style={[styles.iconWrapper, {opacity: opacityIcon}]}>
            {isShowPause && (
              <Icon name={IconName['icon-pause']} style={styles.icon} />
            )}
            {isPaused && (
              <Icon name={IconName['icon-play']} style={styles.icon} />
            )}
          </View>
        ) : null}

        <Video
          ref={videoRef}
          style={styles.video}
          resizeMode="cover"
          source={require('../../assets/videos/push_up.mp4')}
          paused={isPaused}
          onEnd={handleVideoEnd}
        />
      </TouchableOpacity>
      <Text style={styles.labelTip}>Workout Tip:</Text>
      <ScrollView style={styles.tutoText}>
        {tipList.map(item => renderTip(item))}
      </ScrollView>

      <TouchableOpacity
        style={styles.btnStartWrapper}
        onPress={handleStartPress}>
        <Text style={styles.textBtnStart}>Let's practice!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 40,
    width: 40,
    color: '#fff',
  },
  nameSportWrapper: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  nameText: {
    textAlign: 'left',
    fontSize: 20,
    lineHeight: 25,
    fontWeight: 'bold',
  },
  timeText: {
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 20,
  },
  videoWrapper: {
    flex: 1,
    marginVertical: 16,
    marginHorizontal: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'red',
  },
  video: {
    flex: 1,
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
  textBtnStart: {
    color: colors.white,
    fontSize: font.fontBtnBottom,
  },
  tutoText: {
    flex: 1,
  },
  labelTip: {
    textAlign: 'left',
    paddingHorizontal: 16,
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 8,
  },
  tipText: {
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 20,
    paddingLeft: 20,
    paddingRight: 12,
    marginVertical: 4,
  },
});
