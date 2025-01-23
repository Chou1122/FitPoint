import React, {useEffect, useMemo, useState} from 'react';
import {
  KeyboardAvoidingView,
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
import {Nation, NationText} from '../../consts/nation.const';
import LottieView from 'lottie-react-native';
import {LoadingSpinner} from '../../component/loadingSpinner/loading-spinner';
import useAppNavigation from '../../hooks/navigation/use-navigation';
import {Popup} from '../../component/popup/popup';
import {PopUpSuccessChangePass2} from './popup-change-pass';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {space, colors, font} = theme;

export const AccountInfo = () => {
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

  const [name, setName] = useState('Phạm Hồng Minh');
  const [rank, setRank] = useState<RankGym>(RankGym.Expert);

  const [email, setEmail] = useState<string>('mhp12092003@gmail.com');
  const [phone, setPhone] = useState<string>('0888120903');
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [address, setAddress] = useState<string>(
    '8/237 Hàn Thuyên, Tp Nam Định, tỉnh Nam Định',
  );
  const [nation, setNation] = useState<Nation>(Nation.VietNam);
  const [timeExp, setTimeExp] = useState<number | string>(4);
  const [memberShip, setMemberShip] = useState(1);

  const [showPopup, setShowPopup] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const styles = useMemo(() => createStyle(rank), [rank]);

  useEffect(() => {
    //Call api
  }, []);

  const handleChangePassPress = () => {
    navigation.navigate('ChangePassword');
  };

  const handleBuyMembershipPress = () => {};

  const handleChangeName = () => {};

  const handleEditPress = () => {};

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

  return (
    <View style={styles.contanier}>
      <Header btnGoBack={false} title="My Infomation" />
      <Popup isVisible={showPopup}>
        <PopUpSuccessChangePass2
          onPress={handleClosePopup}
          content={popupTitle}
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
              />
            </View>

            <View style={styles.nameWrapper}>
              <Text style={styles.nameText}>{name}</Text>
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
                <Text style={styles.textContent}>{email}</Text>
              </View>
            </View>

            <View style={styles.infoWrapper}>
              <View style={styles.infoLabelWrapper}>
                <Icon name={IconName['icon-phone']} style={styles.iconLabel} />
                <Text style={styles.infoLabelText}>Phone number</Text>
              </View>
              <View style={styles.infoContentWrapper}>
                <Text style={styles.textContent}>{phone}</Text>
              </View>
            </View>

            <View style={styles.infoWrapper}>
              <View style={styles.infoLabelWrapper}>
                <Icon name={IconName['icon-gender']} style={styles.iconLabel} />
                <Text style={styles.infoLabelText}>Gender</Text>
              </View>
              <View style={styles.infoContentWrapper}>
                <Text style={styles.textContent}>{GenderText[gender]}</Text>
              </View>
            </View>

            <View style={styles.infoWrapper}>
              <View style={styles.infoLabelWrapper}>
                <Icon name={IconName['icon-earth']} style={styles.iconLabel2} />
                <Text style={styles.infoLabelText2}>Nation</Text>
              </View>
              <View style={styles.infoContentWrapper}>
                <Text style={styles.textContent}>{NationText[nation]}</Text>
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
                <Text style={styles.textContent}>{address}</Text>
              </View>
            </View>

            <View style={styles.infoWrapper}>
              <View style={styles.infoLabelWrapper}>
                <Icon name={IconName['icon-time']} style={styles.iconLabel} />
                <Text style={styles.infoLabelText}>Experience</Text>
              </View>
              <View style={styles.infoContentWrapper}>
                <Text style={styles.textContent}>{timeExp} Years</Text>
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
  });
