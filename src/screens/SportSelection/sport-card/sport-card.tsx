import React, {useMemo} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CustomText as Text} from '../../../component/text-custom/text-custom';
import {theme} from '../../../hooks/theme/theme';
import useAppNavigation from '../../../hooks/navigation/use-navigation';

const {colors} = theme;

const heightProgess = 5;

export interface SportCardProps {
  name?: string | undefined;
  img?: string | undefined;
  score?: number | undefined;
  duration?: string | undefined | number;
  maxScore?: number;
  id: string;
  showVideo?: boolean;
  onPressCard?: () => void;
  onPressVideo?: () => void;
}

export const SportCard = ({
  name = 'Push up',
  img,
  score = 0,
  maxScore = 100,
  duration = '1',
  id = '0',
  showVideo = false,
  onPressCard,
  onPressVideo,
}: SportCardProps) => {
  const percentScore: string = useMemo(() => {
    const percentage = (score / maxScore) * 100;
    return `${Math.min(Math.max(percentage, 0), 100)}%`;
  }, [score, maxScore]);

  const navigation = useAppNavigation();

  const handleCardPress = () => {
    onPressCard ? onPressCard() : navigation.navigate('SportDetail', {id: id});
  };

  const handleVideoPress = () => {
    onPressVideo && onPressVideo();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleCardPress}>
      <View style={styles.imgWrapper}>
        <Image
          source={require('../../../assets/images/push-up.jpg')}
          style={styles.img}
        />
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.nameWrapper}>
          <Text style={styles.textName}>{name}</Text>
        </View>
        <View style={styles.bodyWrapper}>
          <Text
            style={
              styles.textTime
            }>{`Estimate time: ${duration} minutes`}</Text>

          <Text style={styles.textScore}>{`Your best score: ${score}`}</Text>

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
                  percentScore == '100%' ? colors.green : colors.red,
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
    resizeMode: 'cover',
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
