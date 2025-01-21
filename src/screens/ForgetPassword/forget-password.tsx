import React, {useMemo, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from '../../hooks/theme/theme';
import {Logo} from '../../component/logo/logo';
import {CustomText as Text} from '../../component/text-custom/text-custom';
import {Input} from '../../component/input/input';
import {KeyboardDissMissView} from '../../component/keyboardDismissView/keyboard-dissmiss-view';
import {LoadingSpinner} from '../../component/loadingSpinner/loading-spinner';
import {Icon, IconName} from '../../component/icon/icon';
import useAppNavigation from '../../hooks/navigation/use-navigation';
import axios from 'axios';
import {API_URL} from '@env';

const {colors} = theme;

const {version} = require('../../../package.json');

export const ForgetPassword = () => {
  const navigation = useAppNavigation();

  const [email, setEmail] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleSendPress = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/send-email`, {
        email: email,
      });

      if (response.status === 200) {
        setIsLoading(false);

        // @ts-ignore
        navigation.navigate('EnterOTP', {email: email});
      } else {
        setIsLoading(false);
        Alert.alert('Failed to send email. Please try again!');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error sending email:', error);
      Alert.alert('An error occurred. Please try again later.');
    }
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const disabled = useMemo(() => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return !regex.test(email);
  }, [email]);

  return (
    <KeyboardDissMissView>
      <View style={styles.contanier}>
        <LoadingSpinner isVisible={isLoading} />
        <View style={styles.imgWrapper}>
          <View style={styles.imgBackGround} />
          <Image
            source={require('../../assets/images/gym-img.webp')}
            style={styles.img}
          />
          {
            <View style={styles.infoWrapper}>
              <Text style={styles.textInfo}>v {version}</Text>
            </View>
          }
        </View>
        <KeyboardAvoidingView
          style={styles.scrlWrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          <ScrollView style={styles.scrl}>
            <View style={styles.contentWrapper1}>
              <Logo size={'giant'} opacity={0.8} />
              <Text style={styles.textName}>PerfectFit</Text>
              <Text style={styles.textLabel}>Forgot password</Text>
            </View>

            <View style={styles.contentWrapper2}>
              <Text style={styles.textContent}>
                Enter your email, and we will send an OTP code to your email to
                reset your password.
              </Text>

              <Input
                value={email}
                style={styles.input}
                placeholder="Email"
                inputStyle={styles.inputStyle}
                onChangeText={handleEmailChange}
              />

              {disabled && email && (
                <View style={styles.warningWrapper}>
                  <Icon name={IconName['icon-warning']} style={styles.icon} />
                  <Text style={styles.textWarning}>Your email is invalid!</Text>
                </View>
              )}

              <TouchableOpacity
                style={[styles.btnLogin, disabled && styles.btnDisabled]}
                disabled={disabled}
                onPress={handleSendPress}>
                <Text style={styles.textLogin}>Recovery Password</Text>
              </TouchableOpacity>

              <View style={styles.newUserWrapper}>
                <View style={styles.line} />
                <Text style={styles.newUserText}>Already have an account?</Text>
                <View style={styles.line} />
              </View>

              <TouchableOpacity
                style={styles.btnSignUp}
                onPress={handleLoginPress}>
                <Text style={styles.textLogin}>Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </KeyboardDissMissView>
  );
};

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'left',
    fontWeight: 'bold',
    color: colors.black,
    opacity: 0.72,
  },
  warningWrapper: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 4,
    marginTop: -12,
    opacity: 0.8,
  },
  textWarning: {
    marginLeft: 4,
    fontSize: 14,
    lineHeight: 20,
    color: colors.warning2,
  },
  icon: {
    height: 20,
    width: 20,
    color: colors.warning2,
  },
  btnSignUp: {
    borderRadius: 100,
    backgroundColor: colors.header,
    width: '100%',
    paddingVertical: 12,
    elevation: 4,
    marginBottom: 4,
  },
  infoWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1000,
  },
  textInfo: {
    color: colors.white,
    opacity: 0.6,
    marginRight: 8,
    marginBottom: 4,
  },
  btnLogin: {
    borderRadius: 100,
    backgroundColor: colors.header,
    width: '100%',
    paddingVertical: 12,
    elevation: 4,
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: colors.header,
    opacity: 0.8,
  },
  newUserWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 2,
  },
  newUserText: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.header,
    opacity: 1,
  },
  btnDisabled: {
    opacity: 0.4,
  },
  btnForgot: {
    marginTop: -8,
    alignSelf: 'flex-end',
    paddingRight: 8,
  },
  textForgot: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
    color: colors.blue3,
    opacity: 0.8,
  },
  textLogin: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 24,
    color: colors.black,
    opacity: 0.8,
  },
  input: {
    borderWidth: 0,
    backgroundColor: colors.white0d8,
    borderRadius: 100,
    paddingHorizontal: 16,
    maxHeight: 52,
    height: 52,
  },
  inputStyle: {
    fontSize: 16,
    lineHeight: 24,
  },
  scrlWrapper: {
    width: '100%',
    height: '100%',
  },
  scrl: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  textName: {
    marginTop: 4,
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 28,
    opacity: 0.8,
  },
  textLabel: {
    marginTop: 28,
    fontWeight: 'bold',
    fontSize: 28,
    lineHeight: 32,
  },
  contentWrapper1: {
    marginTop: 20,
    paddingVertical: 20,
    width: '100%',
    backgroundColor: colors.white0d4,
    borderRadius: 12,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper2: {
    marginTop: 20,
    paddingBottom: 20,
    paddingTop: 40,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: colors.white0d4,
    borderRadius: 12,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imgWrapper: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 0,
    left: 0,
    pointerEvents: 'none',
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
});
