import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CustomText as Text} from '../../component/text-custom/text-custom';
import {Header} from '../../component/header/header';
import {theme} from '../../hooks/theme/theme';
import {SportCard} from '../SportSelection/sport-card/sport-card';
import useAppNavigation from '../../hooks/navigation/use-navigation';

const {colors, space, font} = theme;

const heightLabel = 32;

const mockData = [
  {time: '20/12/2024 12:59', score: '0'},
  {time: '22/12/2024 00:13', score: '34'},
  {time: '22/12/2024 00:20', score: '55'},
  {time: '23/12/2024 11:08', score: '89'},
  {time: '23/12/2024 12:05', score: '2'},
  {time: '23/12/2024 08:38', score: '65'},
  {time: '24/12/2024 10:22', score: '72'},
];

export interface SportDetailProps {
  id: string;
}

export const SportDetail = ({id = '0'}: SportDetailProps) => {
  const [history, setHistory] = useState<any>(mockData);
  const navigation = useAppNavigation();

  const renderItem = ({item, isLast = false}: any) => {
    return (
      <View style={styles.historyItem}>
        <View style={styles.contentItem}>
          <Text style={{flex: 1}}>{item.time}</Text>
          <Text style={{flex: 1}}>{item.score}</Text>
        </View>
        {!isLast && <View style={styles.lineGray} />}
      </View>
    );
  };

  const handleStartPress = () => {
    navigation.navigate('SportRecording');
  };

  const handleTutorialPress = () => {
    navigation.navigate('SportTutorial');
  };

  return (
    <View style={styles.container}>
      <Header title="Push up" />
      <View style={styles.contentWrapper}>
        <SportCard
          id={id}
          showVideo={true}
          onPressCard={handleTutorialPress}
          onPressVideo={handleTutorialPress}
        />
        {history.length > 0 ? (
          <View style={{flex: 1, marginHorizontal: 20}}>
            <View style={styles.labelHistoryWrapper}>
              <View style={styles.labelLeft}>
                <Text style={styles.textLeft}>Time</Text>
              </View>
              <View style={styles.lineStand} />
              <View style={styles.labelRight}>
                <Text style={styles.textRight}>Scores</Text>
              </View>
            </View>
            <ScrollView style={styles.historyWrapper}>
              <View style={{height: heightLabel}} />
              {history.map((item, index) => {
                if (index == history.length - 1) {
                  return renderItem({item, isLast: true});
                }
                return renderItem({item});
              })}
            </ScrollView>
            <View style={styles.emptyBox} />
          </View>
        ) : (
          <View style={styles.noHistoryCon}>
            <Text style={styles.noHistoryText}>
              You have no history for this exercise!
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.btnStart} onPress={handleStartPress}>
        <Text style={styles.textBtnStart}>Start the test</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentWrapper: {
    marginTop: 16,
    flex: 1,
  },
  historyItem: {
    height: 38,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyBox: {
    flex: 100,
  },
  noHistoryCon: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noHistoryText: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  lineGray: {
    height: 1,
    width: '100%',
    backgroundColor: colors.gray,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  lineStand: {
    width: 1,
    backgroundColor: colors.white,
    height: '100%',
  },
  labelHistoryWrapper: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: colors.white,
    height: heightLabel,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: colors.yellow,
    zIndex: 100,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  labelLeft: {
    flex: 1,
  },
  labelRight: {
    flex: 1,
  },
  textLeft: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textRight: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyWrapper: {
    marginBottom: 20,
    borderRadius: 8,
    elevation: 8,
    backgroundColor: colors.white,
  },
  btnStart: {
    height: 48,
    backgroundColor: colors.header,
    justifyContent: 'center',
    marginBottom: space.marginBottomBtn,
    marginHorizontal: space.marginHorizontalBtn,
    borderRadius: 8,
  },
  textBtnStart: {
    color: colors.white,
    fontSize: font.fontBtnBottom,
  },
});
