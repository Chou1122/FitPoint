import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {theme} from '../../hooks/theme/theme';
import {CustomText as Text} from '../../component/text-custom/text-custom';

const {colors} = theme;

interface Props {
  onPress: () => void;
  content?: string;
}

export const PopUpSuccessChangePass2 = ({
  onPress,
  content = 'Password change successfully!',
}: Props) => {
  const handlePress = () => {
    onPress?.();
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/lotties/success2.json')}
        autoPlay
        loop={true}
        style={styles.animation}
      />

      <Text style={styles.textContent}>{content}</Text>

      <TouchableOpacity style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white0d8,
    paddingHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 12,
    paddingTop: 0,
    elevation: 12,
  },
  btn: {
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: colors.header,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  btnText: {
    color: colors.white,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  textContent: {
    marginTop: 12,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  animation: {
    height: 100,
    width: 100,
  },
});
