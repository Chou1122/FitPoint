import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CustomText as Text} from '../../component/text-custom/text-custom';
import {Header} from '../../component/header/header';
import {theme} from '../../hooks/theme/theme';
import {SportCard} from '../SportSelection/sport-card/sport-card';
import useAppNavigation from '../../hooks/navigation/use-navigation';
import {LoadingSpinner} from '../../component/loadingSpinner/loading-spinner';
import axios from 'axios';
import {API_URL} from '@env';
import {useSelector} from 'react-redux';
import {formatTimeHistory} from '../../helpers/time.helper';

const {colors, space, font} = theme;

const heightLabel = 32;

export interface SportDetailProps {
  id: string;
  img: string | undefined;
  time: string;
  name: string;
  urlVideo: string;
}

export const SportDetail = (props: any) => {
  const {id = '0', img, time, name, urlVideo} = props.route.params;
  const userInfo = useSelector((state: any) => state.userInfo);

  const [history, setHistory] = useState<any>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const navigation = useAppNavigation();

  const renderItem = ({item, isLast = false, index}: any) => {
    return (
      <View style={styles.historyItem} key={index}>
        <View style={styles.contentItem}>
          <Text style={{flex: 1}}>{formatTimeHistory(item.time)}</Text>
          <Text style={{flex: 1}}>{item.scores}</Text>
        </View>
        {!isLast && <View style={styles.lineGray} />}
      </View>
    );
  };

  const getSportHistory = async () => {
    setIsloading(true);

    try {
      //@ts-ignore
      const response = await axios.get(`${API_URL}/get-sport-historys`, {
        params: {
          userId: userInfo.id,
          sportId: id,
        },
      });
      setIsloading(false);

      setHistory(response.data);
    } catch (error: any) {
      setIsloading(false);
    }
  };

  useEffect(() => {
    getSportHistory();
  }, []);

  const handleStartPress = () => {
    //@ts-ignore
    navigation.navigate('SportRecording', {
      id: id,
      img: img,
      time: time,
      name: name,
      urlVideo: urlVideo,
    });
  };

  const handleTutorialPress = () => {
    //@ts-ignore
    navigation.navigate('SportTutorial', {
      id: id,
      img: img,
      time: time,
      name: name,
      urlVideo: urlVideo,
    });
  };

  const onBackPress = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'MainTab'}],
    });
  };

  return (
    <View style={styles.container}>
      <Header title={name} onBack={onBackPress} />
      <View style={styles.contentWrapper}>
        <LoadingSpinner isVisible={isLoading} />
        <SportCard
          id={id}
          img={img}
          time={time}
          name={name}
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
              {history.map((item: any, index: any) => {
                if (index == history.length - 1) {
                  return renderItem({item, isLast: true, index});
                }
                return renderItem({item, index});
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
    backgroundColor: colors.primary,
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
    color: colors.white,
  },
  textRight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
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
