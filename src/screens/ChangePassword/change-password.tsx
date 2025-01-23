import React, {useMemo, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomText as Text} from '../../component/text-custom/text-custom';
import {Header} from '../../component/header/header';
import {KeyboardDissMissView} from '../../component/keyboardDismissView/keyboard-dissmiss-view';
import {theme} from '../../hooks/theme/theme';
import {Input} from '../../component/input/input';
import {Icon, IconName} from '../../component/icon/icon';
import {LoadingSpinner} from '../../component/loadingSpinner/loading-spinner';
import useAppNavigation from '../../hooks/navigation/use-navigation';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from '@env';
import axios from 'axios';
import {setPasswordUser} from '../../stores/infoUser.store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {colors, space} = theme;

export const ChangePassword = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.userInfo);

  const styles = createStyle();
  const navigation = useAppNavigation();

  const [currPass, setCurrPass] = useState<string>('');
  const [newPass, setNewPass] = useState<string>('');
  const [retypePass, setRetypePass] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkCurrPass = useMemo(() => {
    return currPass === userInfo.password;
  }, [currPass, userInfo]);

  const checkNewPass = useMemo(() => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    return regex.test(newPass);
  }, [newPass]);

  const checkRetypePass = useMemo(() => {
    return newPass === retypePass;
  }, [newPass, retypePass]);

  const disable = useMemo(() => {
    return !(checkCurrPass && checkNewPass && checkRetypePass);
  }, [checkCurrPass, checkNewPass, checkRetypePass]);

  const handleCurrPassChange = (value: string) => {
    setCurrPass(value);
  };

  const handleNewPassChange = (value: string) => {
    setNewPass(value);
  };

  const handleRetypePassChange = (value: string) => {
    setRetypePass(value);
  };

  const handleChangePress = async () => {
    // Call api
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/get-back-pass`, {
        email: userInfo.email,
        newPassword: newPass,
      });

      if (response.status === 200) {
        // Save new pass to store
        dispatch(setPasswordUser(newPass));

        const _password = await AsyncStorage.getItem('password');

        if (_password !== null && _password !== undefined) {
          await AsyncStorage.setItem('password', newPass);
        }
        //

        setIsLoading(false);
        // @ts-ignore
        navigation.navigate('Info', {
          popupTitle: 'Password change successfully!',
        });
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

  return (
    <KeyboardDissMissView>
      <View style={styles.container}>
        <Header title="Change your password" />
        <ScrollView>
          <LoadingSpinner isVisible={isLoading} />
          <View style={styles.inputWrapper}>
            <Text style={styles.text}>Your current password</Text>
            <Input
              placeholder="Your current password"
              isPassword={true}
              value={currPass}
              onChangeText={handleCurrPassChange}
            />
            {!checkCurrPass && currPass.length > 0 && (
              <View style={styles.warningWrapper}>
                <Icon name={IconName['icon-warning']} style={styles.icon} />
                <Text style={styles.warningText}>
                  Your current password is wrong.
                </Text>
              </View>
            )}
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.text}>Your new password</Text>
            <Input
              placeholder="New password (Eg: P@ssw0rd123)"
              isPassword={true}
              value={newPass}
              onChangeText={handleNewPassChange}
            />
            {!checkNewPass && newPass.length > 0 && (
              <View style={styles.warningWrapper2}>
                <View style={styles.iconWrapper}>
                  <Icon name={IconName['icon-warning']} style={styles.icon} />
                </View>
                <Text style={styles.warningText}>
                  At least one lowercase, one uppercase, one digit, one special
                  character, and 6+ characters long.
                </Text>
              </View>
            )}
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.text}>Confirm your new password</Text>
            <Input
              placeholder="Confirm your new password"
              isPassword={true}
              value={retypePass}
              onChangeText={handleRetypePassChange}
            />
            {!checkRetypePass &&
              retypePass.length > 0 &&
              newPass.length > 0 && (
                <View style={styles.warningWrapper}>
                  <Icon name={IconName['icon-warning']} style={styles.icon} />
                  <Text style={styles.warningText}>
                    Passwords do not match!
                  </Text>
                </View>
              )}
          </View>

          <TouchableOpacity
            style={[styles.btnWrapper, disable && styles.btnDisable]}
            disabled={disable}
            onPress={handleChangePress}>
            <Text style={styles.btnText}>Change my password</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardDissMissView>
  );
};

const createStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    btnWrapper: {
      marginTop: 20,
      backgroundColor: colors.header,
      alignSelf: 'flex-start',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
      elevation: 4,
      marginHorizontal: space.marginHorizontalBtn,
    },
    btnDisable: {
      opacity: 0.6,
    },
    btnText: {
      textAlign: 'left',
      fontSize: 16,
      color: colors.white,
    },
    iconWrapper: {
      marginTop: -6,
      height: '100%',
    },
    warningText: {
      textAlign: 'left',
      marginLeft: 3,
      fontSize: 14,
      lineHeight: 16,
      color: colors.warning,
      flex: 1,
    },
    warningWrapper: {
      marginTop: 4,
      alignItems: 'center',
      flexDirection: 'row',
    },
    warningWrapper2: {
      marginTop: 8,
      alignItems: 'center',
      flexDirection: 'row',
    },
    icon: {
      height: 20,
      width: 20,
      color: colors.warning,
    },
    inputWrapper: {
      marginTop: 20,
      paddingHorizontal: space.marginHorizontalBtn,
    },
    text: {
      textAlign: 'left',
      fontSize: 16,
      lineHeight: 20,
      fontWeight: 'bold',
      marginBottom: 4,
    },
  });
