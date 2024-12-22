import React, {Button, ScrollView, StyleSheet, View} from 'react-native';
import useAppNavigation from '../../hooks/navigation/use-navigation';
import {CustomText as Text} from '../../component/text-custom/text-custom';
import {Header} from '../../component/header/header';
import {theme} from '../../hooks/theme/theme';
import {SportCard, SportCardProps} from './sport-card/sport-card';
import {useState} from 'react';

const {colors} = theme;

const mockData = [
  {name: 'Push up', id: '0'},
  {name: 'Push up', id: '0'},
  {name: 'Push up', id: '0'},
  {name: 'Push up', id: '0'},
  {name: 'Push up', id: '0'},
];

export const SportSelection = () => {
  const navigation = useAppNavigation();
  const [sportList, setSportList] = useState<Array<SportCardProps>>(mockData);

  const renderCardSport = (props: SportCardProps) => {
    return <SportCard {...props} />;
  };

  return (
    <View style={styles.container}>
      <Header title={'Select your sport'} />
      <ScrollView style={styles.scrollWrapper}>
        {sportList.map((item, index) => {
          return renderCardSport(item);
        })}
        <View style={styles.emptyBlockBot} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollWrapper: {
    flex: 1,
    paddingTop: 20,
  },
  emptyBlockBot: {
    height: 20,
  },
});
