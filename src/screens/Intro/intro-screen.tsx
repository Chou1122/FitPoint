import React, {useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {theme} from '../../hooks/theme/theme';
import {CustomText as Text} from '../../component/text-custom/text-custom';
import useAppNavigation from '../../hooks/navigation/use-navigation';
import Video, {VideoRef} from 'react-native-video';
import {Logo} from '../../component/logo/logo';

const {colors, font, space} = theme;

export const IntroScreen = () => {
  const navigation = useAppNavigation();

  const videoRef = useRef<VideoRef>(null);

  const handleStartPress = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.contanier}>
      <Video
        ref={videoRef}
        style={styles.video}
        resizeMode="cover"
        source={require('../../assets/videos/intro.mp4')}
        repeat={true}
      />
      <View style={styles.contentWrapper}>
        <View style={styles.labelWrapper}>
          <Text style={styles.textLabel}>PerfectFit</Text>
          <Logo theme="light" size="giant" />
        </View>

        <View style={styles.contentCon}>
          <Text style={styles.textContent}>Unlock your true potential!</Text>
        </View>

        <View style={{flex: 1}} />

        <TouchableOpacity style={styles.btnStart} onPress={handleStartPress}>
          <Text style={styles.textBtnStart}>Start Your Workout Journey</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
  contentWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 100,
  },
  labelWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 44,
    opacity: 0.8,
    elevation: 16,
  },
  textLabel: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 36,
    lineHeight: 40,
  },
  btnStart: {
    height: 48,
    backgroundColor: colors.header,
    justifyContent: 'center',
    marginBottom: space.marginBottomBtn * 2,
    marginHorizontal: space.marginHorizontalBtn * 2,
    borderRadius: 100,
    opacity: 0.6,
    elevation: 16,
  },
  textBtnStart: {
    opacity: 1,
    color: colors.white,
    fontSize: font.fontBtnBottom,
  },
  textContent: {
    color: colors.primary,
    fontSize: 24,
    lineHeight: 28,
    opacity: 0.9,
  },
  contentCon: {
    marginTop: 24,
  },
});
