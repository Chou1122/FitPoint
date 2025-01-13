import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {CustomText as Text} from '../../component/text-custom/text-custom';
import {Header} from '../../component/header/header';
import {KeyboardDissMissView} from '../../component/keyboardDismissView/keyboard-dissmiss-view';
import {theme} from '../../hooks/theme/theme';
import {Input} from '../../component/input/input';
import {Icon, IconName} from '../../component/icon/icon';

const {colors, space} = theme;

export const ChangePassword = () => {
  const styles = createStyle();

  const [currPass, setCurrPass] = useState<string>('');
  const [newPass, setNewPass] = useState<string>('');
  const [retypePass, setRetypePass] = useState<string>('');

  const checkCurrPass = useMemo(() => {}, [currPass]);

  const checkNewPass = useMemo(() => {}, [newPass]);

  const checkRetypePass = useMemo(() => {}, [newPass, retypePass]);

  const handleCurrPassChange = (value: string) => {
    setCurrPass(value);
  };

  const handleNewPassChange = (value: string) => {
    setNewPass(value);
  };

  const handleRetypePassChange = (value: string) => {
    setRetypePass(value);
  };

  return (
    <KeyboardDissMissView>
      <View style={styles.container}>
        <Header title="Change your password" />
        <ScrollView>
          <View style={styles.inputWrapper}>
            <Text style={styles.text}>Your current password</Text>
            <Input
              placeholder="Your current password"
              isPassword={true}
              value={currPass}
              onChangeText={handleCurrPassChange}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.text}>Your new password</Text>
            <Input
              placeholder="New password (Eg: P@ssw0rd123)"
              isPassword={true}
              value={newPass}
              onChangeText={handleNewPassChange}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.text}>Retype your new password</Text>
            <Input
              placeholder="Retype your new password"
              isPassword={true}
              value={retypePass}
              onChangeText={handleRetypePassChange}
            />
            <Icon name={IconName['icon-warning']} style={styles.icon} />
          </View>
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
