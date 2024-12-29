import React, {ScrollView, StyleSheet, View} from 'react-native';
import useAppNavigation from '../../hooks/navigation/use-navigation';
import {CustomText as Text} from '../../component/text-custom/text-custom';
import {Header} from '../../component/header/header';
import {theme} from '../../hooks/theme/theme';
import {
  SportCard,
  SportCardProps,
} from '../SportSelection/sport-card/sport-card';
import {useState} from 'react';

const {colors} = theme;

const mockData = [
  {name: 'Push up', id: '0'},
  {name: 'Jump Squat', id: '1', duration: '2', score: 21},
  {name: 'Bicep Curl', id: '2', duration: '1', score: 100},
  {name: 'Leg Raise', id: '3', duration: '5', score: 49},
  {name: 'Dead Lift', id: '4', duration: '3', score: 11},
];

export const SportSelection = () => {
  const navigation = useAppNavigation();
  const [sportList, setSportList] = useState<Array<SportCardProps>>(mockData);

  const renderCardSport = (props: SportCardProps) => {
    return <SportCard key={props.id} {...props} />;
  };

  return (
    <View style={styles.container}>
      <Header title={'Select your sport'} btnGoBack={false} />
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
