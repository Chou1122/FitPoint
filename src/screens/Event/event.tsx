import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from '../../component/header/header';

export const Event = () => {
  const styles = createStyle();

  return (
    <View style={styles.container}>
      <Header btnGoBack={false} title="Event" />
    </View>
  );
};

const createStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
