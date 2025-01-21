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
import {LoadingSpinner} from '../../component/loadingSpinner/loading-spinner';
import {Icon, IconName} from '../../component/icon/icon';
import useAppNavigation from '../../hooks/navigation/use-navigation';
import {API_URL} from '@env';
import axios from 'axios';

const {colors} = theme;

export const SignUp = () => {
  const navigation = useAppNavigation();

  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');

  const [checkEmail, setCheckEmail] = useState<boolean>(true);
  const [checkPassword, setCheckPassword] = useState<boolean>(true);
  const [checkCPassword, setCheckCPassword] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUserNameChange = (value: string) => {
    setUserName(value);
  };

  const handlePasswordChange = (value: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (value === '') {
      setCheckPassword(true);
    } else {
      setCheckPassword(regex.test(value));
    }

    if (value === '' || confirmPass === '') {
      setCheckCPassword(true);
    } else {
      setCheckCPassword(confirmPass === value);
    }

    setPassword(value);
  };

  const handleEmailChange = (value: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (value === '') {
      setCheckEmail(true);
    } else {
      setCheckEmail(regex.test(value));
    }

    setEmail(value);
  };

  const handleCPassChange = (value: string) => {
    if (value === '') {
      setCheckCPassword(true);
    } else {
      setCheckCPassword(password === value);
    }

    setConfirmPass(value);
  };

  const handleSignUpPress = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/create-user`, {
        userName: userName,
        email: email,
        password: password,
      });
      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Login',
            params: {popupTitle: 'Account registration successfully!'},
          },
        ],
      });
    } catch (error: any) {
      setIsLoading(false);

      if (error.response) {
        const statusCode = error.response.status;
        const errorMessage = error.response.data.error;

        if (statusCode === 400) {
          Alert.alert('Username or Email already exit!');
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

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const disabled = useMemo(() => {
    return !(
      userName &&
      password &&
      confirmPass &&
      email &&
      checkCPassword &&
      checkPassword &&
      checkEmail
    );
  }, [
    userName,
    password,
    confirmPass,
    email,
    checkCPassword,
    checkPassword,
    checkEmail,
  ]);

  return (
    <View style={styles.contanier}>
      <LoadingSpinner isVisible={isLoading} />

      <View style={styles.imgWrapper}>
        <View style={styles.imgBackGround} />
        <Image
          source={require('../../assets/images/gym-img.webp')}
          style={styles.img}
        />
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
            <Text style={styles.textLabel}>Sign Up</Text>
            <Text style={styles.textCreateAcc}>Create your account</Text>
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
              value={email}
              style={styles.input}
              placeholder="Email"
              inputStyle={styles.inputStyle}
              onChangeText={handleEmailChange}
            />

            {!checkEmail && (
              <View style={styles.warningWrapper}>
                <Icon name={IconName['icon-warning']} style={styles.icon} />
                <Text style={styles.textWarning}>Email is invalid!</Text>
              </View>
            )}

            <Input
              value={password}
              style={styles.input}
              placeholder="Password"
              isPassword={true}
              inputStyle={styles.inputStyle}
              onChangeText={handlePasswordChange}
            />

            {!checkPassword && (
              <View style={styles.warningWrapper}>
                <Icon name={IconName['icon-warning']} style={styles.icon} />
                <Text style={styles.textWarning}>
                  At least one lowercase, one uppercase, one digit, one special
                  character, and 6+ characters long.
                </Text>
              </View>
            )}

            <Input
              value={confirmPass}
              style={styles.input}
              placeholder="Confirm Password"
              isPassword={true}
              inputStyle={styles.inputStyle}
              onChangeText={handleCPassChange}
            />

            {!checkCPassword && (
              <View style={styles.warningWrapper}>
                <Icon name={IconName['icon-warning']} style={styles.icon} />
                <Text style={styles.textWarning}>Passwords do not match!</Text>
              </View>
            )}

            <TouchableOpacity
              style={[styles.btnLogin, disabled && styles.btnDisabled]}
              disabled={disabled}
              onPress={handleSignUpPress}>
              <Text style={styles.textLogin}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.newUserWrapper}>
              <View style={styles.line} />
              <Text style={styles.newUserText}>Already have an account?</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity
              style={styles.btnSignUp}
              onPress={handleLoginPress}>
              <Text style={styles.textLogin}>Back to Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: 80,
  },
  warningWrapper: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 4,
    paddingRight: 20,
    marginTop: -12,
    opacity: 0.8,
    flex: 1,
  },
  textWarning: {
    marginLeft: 4,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'left',
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
    minHeight: '100%',
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
  textCreateAcc: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 16,
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
    opacity: 0.4,
    backgroundColor: colors.header,
  },
});
