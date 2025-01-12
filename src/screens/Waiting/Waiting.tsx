import React from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import {theme} from '../../hooks/theme/theme';
import {Logo} from '../../component/logo/logo';
import {CustomText as Text} from '../../component/text-custom/text-custom';

const {version} = require('../../../package.json');

const {colors} = theme;

export const Waiting = () => {
  return (
    <View style={styles.contanier}>
      <View style={styles.imgWrapper}>
        <View style={styles.imgBackGround} />
        <Image
          source={require('../../assets/images/gym-img.webp')}
          style={styles.img}
        />
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.labelWrapper}>
          <Text style={styles.textLabel}>PerfectFit</Text>
          <Logo theme="light" size="giant" />
        </View>
        <ActivityIndicator size={'large'} />
      </View>

      <View style={styles.infoWrapper}>
        <Text style={styles.textInfo}>Created by MinhK66Uet</Text>
        <Text style={styles.textInfo}>Version {version}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imgWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  imgBackGround: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 10,
    opacity: 0.32,
    backgroundColor: colors.header,
  },
  contentWrapper: {
    gap: 40,
    flex: 2,
    paddingTop: 40,
    zIndex: 10,
  },
  infoWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  labelWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 44,
    opacity: 0.72,
    elevation: 16,
  },
  textLabel: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 36,
    lineHeight: 40,
  },
  textContent: {
    color: colors.primary,
    fontSize: 24,
    lineHeight: 28,
    opacity: 0.9,
  },
  textInfo: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 20,
    opacity: 0.8,
  },
  contentCon: {
    marginTop: 24,
  },
});
