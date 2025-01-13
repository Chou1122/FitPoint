import React, {useMemo, useState} from 'react';
import {
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

const {colors} = theme;

const {version} = require('../../../package.json');

export const Login = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [wrongInfo, setWrongInfo] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUserNameChange = (value: string) => {
    setUserName(value);
    setWrongInfo(false);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setWrongInfo(false);
  };

  const handleLoginPress = async () => {
    setIsLoading(true);
  };

  const handleForgotPress = () => {};

  const handleSignUpPress = () => {};

  const disabled = useMemo(() => {
    return !(userName && password);
  }, [userName, password]);

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
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.textInfo}>v {version}</Text>
        </View>
        <KeyboardAvoidingView
          style={styles.scrlWrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView style={styles.scrl}>
            <View style={styles.contentWrapper1}>
              <Logo size={'giant'} opacity={0.8} />
              <Text style={styles.textName}>PerfectFit</Text>
              <Text style={styles.textLabel}>Welcome back!</Text>
            </View>

            <View style={styles.contentWrapper2}>
              <Input
                value={userName}
                style={styles.input}
                placeholder="Username"
                inputStyle={styles.inputStyle}
                onChangeText={handleUserNameChange}
              />
              <Input
                value={password}
                style={styles.input}
                placeholder="Password"
                isPassword={true}
                inputStyle={styles.inputStyle}
                onChangeText={handlePasswordChange}
              />

              <TouchableOpacity
                onPress={handleForgotPress}
                style={styles.btnForgot}>
                <Text style={styles.textForgot}>Forgot password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btnLogin, disabled && styles.btnDisabled]}
                disabled={disabled}
                onPress={handleLoginPress}>
                <Text style={styles.textLogin}>Login</Text>
              </TouchableOpacity>

              <View style={styles.newUserWrapper}>
                <View style={styles.line} />
                <Text style={styles.newUserText}>Or New user?</Text>
                <View style={styles.line} />
              </View>

              <TouchableOpacity
                style={styles.btnSignUp}
                onPress={handleSignUpPress}>
                <Text style={styles.textLogin}>Sign Up</Text>
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
    marginTop: 40,
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
    opacity: 0.8,
  },
  btnForgot: {
    alignSelf: 'flex-end',
    paddingRight: 8,
  },
  textForgot: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
    color: colors.black,
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
    width: '100%',
    height: '100%',
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
