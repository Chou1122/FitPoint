import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomText as Text} from '../../component/text-custom/text-custom';
import {Header} from '../../component/header/header';
import {Avatar} from '../../component/avatar/avatar';
import {theme} from '../../hooks/theme/theme';
import {Icon, IconName} from '../../component/icon/icon';
import {
  Gender,
  GenderText,
  RankGym,
  rankText,
  rankTheme,
} from '../../consts/app.const';
import {Nation, NationIcon, NationText} from '../../consts/nation.const';
import LottieView from 'lottie-react-native';
import {LoadingSpinner} from '../../component/loadingSpinner/loading-spinner';
import useAppNavigation from '../../hooks/navigation/use-navigation';
import {Popup} from '../../component/popup/popup';
import {PopUpSuccessChangePass2} from './popup-change-pass';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {API_URL} from '@env';

import {launchImageLibrary} from 'react-native-image-picker';

const {space, colors, font} = theme;

export const AccountInfo = () => {
  const userInfo = useSelector((state: any) => state.userInfo);
  const navigation = useAppNavigation();

  const route = useRoute();
  const params = route.params;
  // @ts-ignore
  const popupTitle = params?.popupTitle;

  useEffect(() => {
    if (popupTitle) {
      setShowPopup(true);
      return;
    }
    setShowPopup(false);
  }, [popupTitle]);

  const [name, setName] = useState(null);
  const [rank, setRank] = useState<RankGym>(RankGym.Expert);

  const [email, setEmail] = useState<string | null>(userInfo.email);
  const [phone, setPhone] = useState<string | null>(null);
  const [gender, setGender] = useState<Gender | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [nation, setNation] = useState<Nation | null>(null);
  const [timeExp, setTimeExp] = useState<number | string | null>(null);
  const [avatar, setAvatar] = useState<any>(null);

  const [memberShip, setMemberShip] = useState(1);

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showPopupAvt, setShowPopupAvt] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const styles = useMemo(() => createStyle(rank), [rank]);

  const getUserInfo = async () => {
    setIsLoading(true);

    try {
      //@ts-ignore
      const response = await axios.get(`${API_URL}/get-user-info`, {
        params: {
          userId: userInfo.id,
        },
      });

      const {data} = response;

      setNation(data.nation);
      setPhone(data.phone);
      setGender(data.gender);
      setEmail(data.email ? data.email : userInfo.email);
      setAddress(data.address);
      setTimeExp(data.experience);
      setName(data.name);
      setAvatar(data.avt);

      setIsLoading(false);
    } catch (error: any) {
      console.log('ERROR: ', error);

      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserInfo();
    }, []),
  );

  const handleChangePassPress = () => {
    navigation.navigate('ChangePassword');
  };

  const handleBuyMembershipPress = () => {};

  const handleChangeName = () => {
    //@ts-ignore
    navigation.navigate('ChangeInfo', {
      name: name,
      email: email,
      phone: phone,
      gender: gender,
      nation: nation,
      address: address,
      timeExp: timeExp,
    });
  };

  const handleEditPress = () => {
    //@ts-ignore
    navigation.navigate('ChangeInfo', {
      name: name,
      email: email,
      phone: phone,
      gender: gender,
      nation: nation,
      address: address,
      timeExp: timeExp,
    });
  };

  const handleLogout = async () => {
    setIsLoading(true);

    await AsyncStorage.removeItem('userName');
    await AsyncStorage.removeItem('password');

    setIsLoading(false);
    navigation.navigate('Login');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleClostPopupAvt = () => {
    setShowPopupAvt(false);
  };

  const requestPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: 'Permission Required',
          message: 'App needs access to your photos to select avatar.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return true;
  };

  const handleChangeAvtPress = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      return;
    }

    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (response.didCancel || response.errorCode) return;

      const asset = response.assets?.[0];

      if (!asset) return;

      await uploadImageToCloudinary(asset);
    });
  };

  const uploadImageToCloudinary = async (photo: any) => {
    try {
      setIsLoading(true);
      const data = new FormData();

      const uri =
        Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri;

      data.append('file', {
        uri: photo.uri,
        name: photo.fileName || `photo_${Date.now()}.jpg`,
        type: photo.type || 'image/jpeg',
      });

      data.append('upload_preset', 'perfect-fit'); // thay bằng upload preset của bạn
      data.append('cloud_name', 'dx3prv3ka'); // thay bằng cloud name của bạn

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dx3prv3ka/image/upload',
        {
          method: 'POST',
          body: data,
        },
      );

      const result = await res.json();

      if (result.secure_url) {
        // Save avt to db
        await axios.post(`${API_URL}/update-user-avt`, {
          userId: userInfo.id,
          avt: result.secure_url,
        });

        setAvatar(result.secure_url);

        // Alert.alert('Success', 'Avatar updated successfully!');
        setShowPopupAvt(true);
      } else {
        Alert.alert('Upload failed', 'Please try again.');
      }

      setIsLoading(false);
    } catch (error) {
      console.log('Upload error:', error);
      setIsLoading(false);
      Alert.alert('Error', 'Something went wrong during upload.');
    }
  };

  return (
    <View style={styles.contanier}>
      <Header btnGoBack={false} title="My Infomation" />
      <Popup isVisible={showPopup}>
        <PopUpSuccessChangePass2
          onPress={handleClosePopup}
          content={popupTitle}
        />
      </Popup>

      {/* Popup avt */}
      <Popup isVisible={showPopupAvt}>
        <PopUpSuccessChangePass2
          onPress={handleClostPopupAvt}
          content={'Avatar updated successfully!'}
        />
      </Popup>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <LoadingSpinner isVisible={isLoading} />
        <ScrollView>
          <View style={styles.topInfoWrapper}>
            {memberShip && <View style={styles.topBackgroundMember} />}
            <View style={styles.avtWrapper}>
              <Avatar
                height={space.avtInfo}
                width={space.avtInfo}
                editable={true}
                source={avatar}
                onEditPress={handleChangeAvtPress}
              />
            </View>

            <View style={styles.nameWrapper}>
              {name ? (
                <Text style={styles.nameText}>{name}</Text>
              ) : (
                <Text style={styles.nameText}>Anonymous</Text>
              )}
              <TouchableOpacity onPress={handleChangeName}>
                <Icon name={IconName['icon-edit']} style={styles.iconLabel} />
              </TouchableOpacity>
            </View>

            <View style={styles.rankWrapper}>
              <View style={styles.rankCon}>
                <Text style={styles.rankText}>{rankText[rank]}</Text>
              </View>
              {memberShip && (
                <LottieView
                  source={require('../../assets/lotties/membership-2.json')}
                  autoPlay
                  loop
                  style={styles.animation}
                />
              )}
            </View>
          </View>

          <View style={styles.bottomInfoWrapper}>
            <TouchableOpacity onPress={handleEditPress} style={styles.btnEdit}>
              <Icon name={IconName['icon-edit']} style={styles.iconLabel2} />
            </TouchableOpacity>

            <View style={styles.infoWrapper}>
              <View style={styles.infoLabelWrapper}>
                <Icon name={IconName['icon-email']} style={styles.iconLabel} />
                <Text style={styles.infoLabelText}>Email</Text>
              </View>
              <View style={styles.infoContentWrapper}>
                {email ? (
                  <Text style={styles.textContent}>{email}</Text>
                ) : (
                  <Text style={styles.textNoInfo}>No information</Text>
                )}
              </View>
            </View>

            <View style={styles.infoWrapper}>
              <View style={styles.infoLabelWrapper}>
                <Icon name={IconName['icon-phone']} style={styles.iconLabel} />
                <Text style={styles.infoLabelText}>Phone number</Text>
              </View>
              <View style={styles.infoContentWrapper}>
                {phone ? (
                  <Text style={styles.textContent}>{phone}</Text>
                ) : (
                  <Text style={styles.textNoInfo}>No information</Text>
                )}
              </View>
            </View>

            <View style={styles.infoWrapper}>
              <View style={styles.infoLabelWrapper}>
                <Icon name={IconName['icon-gender']} style={styles.iconLabel} />
                <Text style={styles.infoLabelText}>Gender</Text>
              </View>
              <View style={styles.infoContentWrapper}>
                {gender != null ? (
                  <Text style={styles.textContent}>{GenderText[gender]}</Text>
                ) : (
                  <Text style={styles.textNoInfo}>No information</Text>
                )}
              </View>
            </View>

            <View style={styles.infoWrapper}>
              <View style={styles.infoLabelWrapper}>
                <Icon name={IconName['icon-earth']} style={styles.iconLabel2} />
                <Text style={styles.infoLabelText2}>Nation</Text>
              </View>
              <View style={styles.infoContentWrapper}>
                {nation != null ? (
                  <View style={styles.nationWrapper}>
                    <Icon name={NationIcon[nation]} style={styles.iconFlag} />
                    <Text style={styles.textContent}>{NationText[nation]}</Text>
                  </View>
                ) : (
                  <Text style={styles.textNoInfo}>No information</Text>
                )}
              </View>
            </View>

            <View style={styles.infoWrapper}>
              <View style={styles.infoLabelWrapper}>
                <Icon
                  name={IconName['icon-address']}
                  style={styles.iconLabel}
                />
                <Text style={styles.infoLabelText}>Address</Text>
              </View>
              <View style={styles.infoContentWrapper}>
                {address ? (
                  <Text style={styles.textContent}>{address}</Text>
                ) : (
                  <Text style={styles.textNoInfo}>No information</Text>
                )}
              </View>
            </View>

            <View style={styles.infoWrapper}>
              <View style={styles.infoLabelWrapper}>
                <Icon name={IconName['icon-time']} style={styles.iconLabel} />
                <Text style={styles.infoLabelText}>Experience</Text>
              </View>
              <View style={styles.infoContentWrapper}>
                {timeExp ? (
                  <Text style={styles.textContent}>{timeExp} Years</Text>
                ) : (
                  <Text style={styles.textNoInfo}>No information</Text>
                )}
              </View>
            </View>
          </View>

          <View style={styles.bottomBtnWrapper}>
            <TouchableOpacity
              style={styles.btnChangePass}
              onPress={handleChangePassPress}>
              <Text style={styles.textChangePass}>Change my password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnBuyMember}
              onPress={handleBuyMembershipPress}>
              <Text style={styles.textChangePass}>Get Membership</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomBtnWrapper}>
            <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
              <Text style={styles.textChangePass}>Log out</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.emptyFooter} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const createStyle = (rank: RankGym) =>
  StyleSheet.create({
    animation: {
      height: 52,
      width: 52,
    },
    contanier: {
      flex: 1,
    },
    bottomBtnWrapper: {
      flexDirection: 'row',
      width: '100%',
      marginTop: 12,
      justifyContent: 'space-between',
      paddingHorizontal: space.marginHorizontalBtn,
    },
    emptyFooter: {
      height: 60,
      marginTop: 20,
    },
    iconLabel: {
      height: space.iconLabelInfo,
      width: space.iconLabelInfo,
    },
    iconLabel2: {
      height: space.iconLabelInfo2,
      width: space.iconLabelInfo2,
    },
    btnLogout: {
      backgroundColor: colors.blue2,
      borderRadius: 8,
      paddingVertical: 12,
      alignSelf: 'flex-start',
      elevation: 4,
      width: '100%',
      opacity: 0.9,
    },
    btnChangePass: {
      backgroundColor: colors.blue2,
      borderRadius: 8,
      paddingVertical: 12,
      alignSelf: 'flex-start',
      elevation: 4,
      width: '49%',
      opacity: 0.9,
    },
    textChangePass: {
      color: colors.white,
      fontSize: 16,
    },
    btnBuyMember: {
      backgroundColor: colors.yellow2,
      borderRadius: 8,
      paddingVertical: 12,
      alignSelf: 'flex-start',
      elevation: 4,
      width: '49%',
      opacity: 0.9,
    },
    topBackgroundMember: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.yellow2,
      opacity: 0.4,
      position: 'absolute',
      top: 0,
      left: 0,
    },
    topInfoWrapper: {
      backgroundColor: colors.white,
      marginTop: 20,
      marginHorizontal: space.marginHorizontalBtn,
      borderRadius: 12,
      elevation: 8,
    },
    infoWrapper: {
      flexDirection: 'column',
    },
    infoLabelWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 12,
      paddingLeft: 12,
      height: 32,
    },
    infoLabelText: {
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: 24,
      marginLeft: 8,
    },
    infoLabelText2: {
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: 24,
      marginLeft: 4,
    },
    infoContentWrapper: {
      marginTop: 4,
      paddingLeft: 40,
    },
    textContent: {
      textAlign: 'left',
      fontSize: 16,
      lineHeight: 20,
    },
    textNoInfo: {
      textAlign: 'left',
      fontSize: 16,
      lineHeight: 20,
      color: colors.blue4,
    },
    bottomInfoWrapper: {
      backgroundColor: colors.white,
      marginTop: 20,
      marginHorizontal: space.marginHorizontalBtn,
      borderRadius: 12,
      elevation: 8,
      paddingBottom: 12,
      paddingTop: 4,
    },
    btnEdit: {
      position: 'absolute',
      right: 8,
      top: 8,
    },
    avtWrapper: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    nameWrapper: {
      marginTop: 8,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 4,
      paddingLeft: 8,
    },
    nameText: {
      fontWeight: 'bold',
      fontSize: font.fontNameInfo,
      lineHeight: 24,
      color: colors.black,
    },
    rankWrapper: {
      marginTop: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    rankCon: {
      backgroundColor: rankTheme[rank].backgroundColor,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 100,
      elevation: 12,
    },
    rankText: {
      color: rankTheme[rank].textColor,
      fontWeight: 'bold',
      fontSize: 16,
      lineHeight: 20,
    },
    iconFlag: {
      width: 40,
      height: 28,
    },
    nationWrapper: {
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
    },
  });
