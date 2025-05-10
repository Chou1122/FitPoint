import React, {useEffect, useMemo, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CustomText as Text} from '../../../component/text-custom/text-custom';
import {theme} from '../../../hooks/theme/theme';
import useAppNavigation from '../../../hooks/navigation/use-navigation';
import {formatTime} from '../../../helpers/time.helper';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {API_URL} from '@env';

const {colors} = theme;

const heightProgess = 5;

export interface SportCardProps {
  name?: string | undefined;
  img?: string | undefined;
  score?: number | undefined;
  time?: string | undefined | number;
  maxScore?: number;
  id: string;
  showVideo?: boolean;
  urlVideo: string;
  call?: boolean;
  onPressCard?: () => void;
  onPressVideo?: () => void;
}

export const SportCard = ({
  name = 'Push up',
  img,
  score = 0,
  maxScore = 100,
  time = '1',
  id = '0',
  showVideo = false,
  urlVideo = 'https://res.cloudinary.com/dx3prv3ka/video/upload/v1745405487/push_up_fpvbve.mp4',
  call = false,
  onPressCard,
  onPressVideo,
}: SportCardProps) => {
  const [scoreCal, setScoreCal] = useState(score);
  const [maxScoreCal, setMaxScoreCal] = useState(maxScore);

  const percentScore: string = useMemo(() => {
    const percentage = (scoreCal / maxScoreCal) * 100;
    return `${Math.min(Math.max(percentage, 0), 100)}%`;
  }, [scoreCal, maxScoreCal]);

  const userInfo = useSelector((state: any) => state.userInfo);

  const navigation = useAppNavigation();

  const [imgThumbnail, setImgThumbnail] = useState<string | undefined>(img);

  const handleCardPress = () => {
    // console.log('UR: ', urlVideo);

    onPressCard
      ? onPressCard()
      : // @ts-ignore
        navigation.navigate('SportDetail', {
          id: id,
          name: name,
          img: imgThumbnail,
          time: time,
          urlVideo: urlVideo,
          maxScore: maxScore,
          score: scoreCal,
        });
  };

  const handleVideoPress = () => {
    onPressVideo && onPressVideo();
  };

  const handleErrorImg = () => {
    setImgThumbnail(
      'https://res.cloudinary.com/dx3prv3ka/image/upload/v1740049787/lhqwdmt5lrd4eatfbaxa.jpg',
    );
  };

  const getMaxScore = (data: any) => {
    //@ts-ignore
    return Math.max(...data.map(item => item.scores));
  };

  const getSportHistory = async () => {
    try {
      //@ts-ignore
      const response = await axios.get(`${API_URL}/get-sport-historys`, {
        params: {
          userId: userInfo.id,
          sportId: id,
        },
      });

      const maxS = Math.min(getMaxScore(response.data) * 10, 100);

      setScoreCal(maxS);
    } catch (error: any) {
      console.log('ERROR: ', error);
    }
  };

  useEffect(() => {
    call && getSportHistory();
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={handleCardPress}>
      <View style={styles.imgWrapper}>
        <Image
          source={{
            uri: imgThumbnail,
          }}
          style={styles.img}
          onError={handleErrorImg}
        />
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.nameWrapper}>
          <Text style={styles.textName}>{name}</Text>
        </View>
        <View style={styles.bodyWrapper}>
          <Text style={styles.textTime}>{`Estimate time: ${formatTime(
            time,
          )}`}</Text>

          <Text style={styles.textScore}>{`Your best score: ${
            scoreCal / 10
          }`}</Text>

          {showVideo && (
            <TouchableOpacity onPress={handleVideoPress}>
              <Text style={styles.textVideo}>Watch Tutorial</Text>
            </TouchableOpacity>
          )}
        </View>

        {!showVideo && (
          <View
            style={[
              styles.progessBar,
              // @ts-ignore
              {
                width: percentScore,
                backgroundColor:
                  percentScore == '100%'
                    ? colors.green
                    : percentScore >= '70%'
                    ? colors.yellow2
                    : colors.red,
              },
            ]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    elevation: 8,
    backgroundColor: colors.white,
    paddingLeft: 12,
    overflow: 'hidden',
  },
  imgWrapper: {
    height: 100,
    aspectRatio: 1,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  contentWrapper: {
    flex: 1,
    paddingTop: 4,
    borderRadius: 8,
  },
  nameWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textName: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  bodyWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  textTime: {
    fontSize: 14,
    lineHeight: 16,
    marginTop: 8,
  },
  textScore: {
    fontSize: 14,
    lineHeight: 16,
    marginTop: 8,
  },
  textVideo: {
    fontSize: 14,
    lineHeight: 16,
    marginTop: 8,
    fontWeight: 'bold',
    color: colors.blue,
  },
  progessBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: heightProgess,
    backgroundColor: colors.red,
  },
});
