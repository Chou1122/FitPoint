import React, {useEffect, useMemo, useState} from 'react';
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
import {Popup} from '../../component/popup/popup';
import {PopUpSuccessChangePass} from './popup-success-change-pass';
import {useRoute} from '@react-navigation/native';
import {API_URL} from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setUser, UserInfo} from '../../stores/infoUser.store';

const {colors} = theme;

const {version} = require('../../../package.json');

export const Login = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.userInfo);

  const navigation = useAppNavigation();

  const route = useRoute();
  const params = route.params;
  // @ts-ignore
  const popupTitle = params?.popupTitle;

  const checkHasToken = async () => {
    const userName = await AsyncStorage.getItem('userName');
    const password = await AsyncStorage.getItem('password');

    if (userName !== null && password !== null) {
      setIsLoading(true);
      await handleLogin(userName, password);
    }

    return;
  };

  useEffect(() => {
    checkHasToken();
  }, []);

  useEffect(() => {
    if (popupTitle) {
      handleSetShowPopup(true);
      return;
    }
    handleSetShowPopup(false);
  }, [popupTitle]);

  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [wrongInfo, setWrongInfo] = useState<boolean>(false);
  const [checkRe, setCheckRe] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleUserNameChange = (value: string) => {
    setUserName(value);
    setWrongInfo(false);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setWrongInfo(false);
  };

  const handleLogin = async (userName: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/login`, {
        userName: userName,
        password: password,
      });
      setIsLoading(false);

      const {userId, email} = response.data;

      const newUserInfo: UserInfo = {
        id: userId,
        email: email,
        userName: userName,
        password: password,
      };

      dispatch(setUser(newUserInfo));

      navigation.reset({
        index: 0,
        routes: [{name: 'MainTab'}],
      });
    } catch (error: any) {
      setIsLoading(false);

      if (error.response) {
        setWrongInfo(true);
        const statusCode = error.response.status;
        const errorMessage = error.response.data.error;

        if (statusCode === 400) {
          Alert.alert('Wrong username or password!');
        } else {
          Alert.alert('Something error. Please try again!');
        }
      } else if (error.request) {
        Alert.alert('Can not connect to server');
      } else {
        Alert.alert('Error!');
      }
    }
  };

  const handleLoginPress = async () => {
    if (checkRe) {
      await AsyncStorage.setItem('userName', userName);
      await AsyncStorage.setItem('password', password);
    } else {
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('password');
    }

    await handleLogin(userName, password);
  };

  const handleForgotPress = () => {
    navigation.navigate('ForgetPassword');
  };

  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  const handleSetShowPopup = (value: boolean) => {
    setShowPopup(value);
  };

  const handleCheckPress = () => {
    setCheckRe(!checkRe);
  };

  const disabled = useMemo(() => {
    return !(userName && password);
  }, [userName, password]);

  return (
    <KeyboardDissMissView>
      <>
        <LoadingSpinner isVisible={isLoading} />
        <Popup isVisible={showPopup} animationType="none">
          <PopUpSuccessChangePass
            onPress={() => handleSetShowPopup(false)}
            content={popupTitle}
          />
        </Popup>
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
          <ScrollView
            style={styles.scrl}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
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

              {wrongInfo && (
                <View style={styles.warningWrapper}>
                  <Icon name={IconName['icon-warning']} style={styles.icon} />
                  <Text style={styles.textWarning}>
                    Wrong username or password!
                  </Text>
                </View>
              )}

              <View style={styles.btnAndReWapper}>
                <TouchableOpacity
                  style={styles.btnRemember}
                  onPress={handleCheckPress}>
                  <View
                    style={[styles.rememberBtn, checkRe && styles.btnChecked]}>
                    {checkRe && (
                      <Icon
                        name={IconName['icon-check']}
                        style={styles.iconCheck}
                      />
                    )}
                  </View>
                  <Text style={styles.textRememberMe}>Remember me</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleForgotPress}
                  style={styles.btnForgot}>
                  <Text style={styles.textForgot}>Forgot password?</Text>
                </TouchableOpacity>
              </View>

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
            <View style={styles.footer} />
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    </KeyboardDissMissView>
  );
};

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: 60,
  },
  warningWrapper: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 4,
    marginTop: -12,
    opacity: 0.8,
  },
  btnRemember: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  rememberBtn: {
    width: 16,
    height: 16,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray3,
  },
  btnChecked: {
    backgroundColor: colors.blue3,
    borderColor: colors.blue3,
  },
  iconCheck: {
    width: 10,
    height: 10,
    color: colors.white,
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
    opacity: 0.4,
  },
  btnAndReWapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -8,
    width: '100%',
    paddingHorizontal: 8,
  },
  btnForgot: {
    alignSelf: 'flex-end',
  },
  textRememberMe: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: 'bold',
    color: colors.blue3,
    opacity: 0.8,
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
    width: '100%',
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
