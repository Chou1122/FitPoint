import React, {ScrollView, StyleSheet, View} from 'react-native';
import {Header} from '../../component/header/header';
import {theme} from '../../hooks/theme/theme';
import {
  SportCard,
  SportCardProps,
} from '../SportSelection/sport-card/sport-card';
import {useCallback, useState} from 'react';
import {API_URL} from '@env';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import {LoadingSpinner} from '../../component/loadingSpinner/loading-spinner';
import {CustomText as Text} from '../../component/text-custom/text-custom';

const {colors} = theme;

const mockData = [
  {name: 'Push up', id: '0'},
  {name: 'Jump Squat', id: '1', duration: '2', score: 21},
  {name: 'Bicep Curl', id: '2', duration: '1', score: 100},
  {name: 'Leg Raise', id: '3', duration: '5', score: 49},
  {name: 'Dead Lift', id: '4', duration: '3', score: 11},
];

export const SportSelection = () => {
  const [sportList, setSportList] = useState<Array<SportCardProps>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const renderCardSport = (props: SportCardProps) => {
    return <SportCard key={props.id} {...props} />;
  };

  const handleGetSport = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${API_URL}/get-sport-list`, {});
      setIsLoading(false);

      setSportList(response.data);
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleGetSport();
    }, []),
  );

  return (
    <View style={styles.container}>
      <LoadingSpinner isVisible={isLoading} />
      <Header title={'Select your sport'} btnGoBack={false} />
      {sportList.length > 0 ? (
        <ScrollView style={styles.scrollWrapper}>
          {sportList.map((item, index) => {
            return renderCardSport(item);
          })}
          <View style={styles.emptyBlockBot} />
        </ScrollView>
      ) : (
        <View>
          <Text>There is no sport now!</Text>
        </View>
      )}
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
