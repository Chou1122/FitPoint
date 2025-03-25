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
import {useRoute} from '@react-navigation/native';
import {setEmailUser} from '../../stores/infoUser.store';
import {DropDownPicker} from '../../component/dropdownpicker/dropdownpicker';
import {ListGender} from './list-gender';
import {Gender} from '../../consts/app.const';
import {ListNation} from './list-nation';
import {Nation} from '../../consts/nation.const';

const {colors, space} = theme;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const ChangeInfo = () => {
  const route = useRoute();
  const dispatch = useDispatch();

  const params = route.params;

  const userInfo = useSelector((state: any) => state.userInfo);

  const styles = createStyle();
  const navigation = useAppNavigation();

  //@ts-ignore
  const [email, setEmail] = useState<string | null>(params.email);
  //@ts-ignore
  const [phone, setPhone] = useState<string | null>(params.phone);
  //@ts-ignore
  const [gender, setGender] = useState<any>(params.gender);
  //@ts-ignore
  const [nation, setNation] = useState<any>(params.nation);
  //@ts-ignore
  const [address, setAddress] = useState<string | null>(params.address);
  //@ts-ignore
  const [timeExp, setTimeExp] = useState<string | null>(params.timeExp);

  const [currPass, setCurrPass] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkCurrPass = useMemo(() => {
    return currPass === userInfo.password;
  }, [currPass, userInfo]);

  const disable = useMemo(() => {
    return !checkCurrPass;
  }, [checkCurrPass]);

  const handleCurrPassChange = (value: string) => {
    setCurrPass(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
  };

  const handleTimeExpChange = (value: string) => {
    setTimeExp(value);
  };

  const handleGenderChange = (value: Gender) => {
    setGender(value);
  };

  const handleNationChange = (value: Nation) => {
    setNation(value);
  };

  const checkEmail = useMemo(() => {
    return emailRegex.test(email || '');
  }, [email]);

  const handleChangePress = async () => {
    // Call api
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/update-user-info`, {
        userId: userInfo.id,
        email: email,
        phone: phone,
        gender: gender,
        nation: nation,
        address: address,
        experience: timeExp,
      });

      if (response.status === 200) {
        setIsLoading(false);

        dispatch(setEmailUser(email));
        // @ts-ignore
        navigation.navigate('Info', {
          popupTitle: 'Information changed successfully!',
        });
      } else {
        setIsLoading(false);
        Alert.alert('Failed to change your information. Please try again!');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error change info:', error);
      Alert.alert('An error occurred. Please try again later.');
    }
  };

  return (
    <KeyboardDissMissView>
      <View style={styles.container}>
        <Header title="Change your information" />
        <ScrollView>
          <LoadingSpinner isVisible={isLoading} />

          <View style={styles.inputWrapper}>
            <Text style={styles.text}>Your email</Text>
            <Input
              placeholder="Email"
              isPassword={false}
              value={email}
              onChangeText={handleEmailChange}
            />
            {email !== null && !checkEmail && email.length > 0 && (
              <View style={styles.warningWrapper}>
                <Icon name={IconName['icon-warning']} style={styles.icon} />
                <Text style={styles.warningText}>Your email is invalid!</Text>
              </View>
            )}
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.text}>Your phone number</Text>
            <Input
              placeholder="Phone number"
              keyboardType={'number-pad'}
              isPassword={false}
              value={phone}
              onChangeText={handlePhoneChange}
            />
          </View>

          <View style={styles.dropdownCon}>
            <Text style={styles.text}>Gender</Text>

            <DropDownPicker
              initialValue={gender}
              listItem={ListGender}
              styleContainer={styles.dropdownWrapper}
              placeholder="Select your gender"
              onChangeValue={handleGenderChange}
            />
          </View>

          <View style={styles.dropdownCon}>
            <Text style={styles.text}>Nation</Text>

            <DropDownPicker
              initialValue={nation}
              listItem={ListNation}
              styleContainer={styles.dropdownWrapper}
              placeholder="Select your nation"
              onChangeValue={handleNationChange}
              maxHeightDropDown={120}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.text}>Your address</Text>
            <Input
              placeholder="Address"
              isPassword={false}
              value={address}
              onChangeText={handleAddressChange}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.text}>Your years of experience</Text>
            <Input
              placeholder="Years of experience"
              isPassword={false}
              keyboardType={'number-pad'}
              value={timeExp}
              onChangeText={handleTimeExpChange}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.text}>
              Type your current password to confirm
            </Text>
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

          <TouchableOpacity
            style={[styles.btnWrapper, disable && styles.btnDisable]}
            disabled={disable}
            onPress={handleChangePress}>
            <Text style={styles.btnText}>Update my information</Text>
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
    dropdownCon: {
      marginTop: 20,
      marginHorizontal: space.marginHorizontalBtn,
    },
    dropdownWrapper: {
      marginTop: 4,
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
