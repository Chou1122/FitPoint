import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {CustomText as Text} from '../../component/text-custom/text-custom';
import {Header} from '../../component/header/header';
import {theme} from '../../hooks/theme/theme';
import useAppNavigation from '../../hooks/navigation/use-navigation';
import {SportCard} from '../SportSelection/sport-card/sport-card';
import {Icon, IconName} from '../../component/icon/icon';

const {colors, font, space} = theme;

const mockCmt = [
  'Excellent! You did the exercise perfectly with great technique. Keep it up!',
  'Your workout is great, but there are still some small details to improve. Pay more attention to your breathing and accuracy for better results!',
  'Your workout is average. Improve your technique and try to maintain a steady pace for better results.',
  "There are many flaws in technique, but don't get discouraged! Start at a slower pace and focus on correct form.",
  'Your exercise is not up to standard. Keep practicing, starting from the basics to gradually improve.',
];

const mockRank = ['Excellent !!', 'Good !', 'Average', 'Bad !', 'Very bad !!'];

export const RecordResult = ({id}: any) => {
  const navigation = useAppNavigation();

  const [duration, setDuration] = useState<string>('00:16');
  const [accuracy, setAccuracy] = useState<number>(60.237);
  const [stability, setStability] = useState<number>(59.894);
  const [repetitions, setRepetitions] = useState<number>(4);
  const [overall, setOverall] = useState<number>(5.807);

  const [commentList, setCommentList] = useState<string[]>(mockCmt);
  const [rankList, setRankList] = useState<string[]>(mockRank);

  const styles = createStyle(overall);

  const onBack = () => {
    navigation.navigate('SportDetail', {id: '0'});
  };

  const sportListPress = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'SportSelection'}],
    });
  };

  const tryAgainPress = () => {
    navigation.goBack();
  };

  const getComment = () => {
    if (overall >= 9) return 0;
    if (overall >= 7) return 1;
    if (overall >= 5) return 2;
    if (overall >= 3) return 3;
    return 4;
  };

  const getIcon = () => {
    if (overall >= 9) return IconName['icon-very-happy'];
    if (overall >= 7) return IconName['icon-happy'];
    if (overall >= 5) return IconName['icon-neutral'];
    if (overall >= 3) return IconName['icon-sad'];
    return IconName['icon-very-sad'];
  };

  return (
    <View style={styles.container}>
      <Header title="Your recording result" onBack={onBack} />

      <View style={styles.cardCon}>
        <SportCard id={id} showVideo={false} onPressCard={onBack} />
      </View>

      <View style={styles.resultWrapper}>
        <View style={styles.resultCon}>
          <Text style={styles.resultLabel}>Your result</Text>

          <View style={styles.line} />

          <View style={styles.resultDetail}>
            <Text style={styles.textDetail}>Duration:</Text>
            <Text style={styles.textDetail}>{duration}</Text>
          </View>

          <View style={styles.resultDetail}>
            <Text style={styles.textDetail}>Accuracy:</Text>
            <Text style={styles.textDetail}>{accuracy}%</Text>
          </View>

          <View style={styles.resultDetail}>
            <Text style={styles.textDetail}>Stability:</Text>
            <Text style={styles.textDetail}>{stability}%</Text>
          </View>

          <View style={styles.resultDetail}>
            <Text style={styles.textDetail}>Repetitions:</Text>
            <Text style={styles.textDetail}>{repetitions}</Text>
          </View>

          <View style={styles.line} />

          <View style={styles.resultDetail}>
            <Text style={styles.textDetail}>Overall:</Text>
            <Text style={styles.textDetail}>{overall}</Text>
          </View>
        </View>

        <View style={styles.commentWrapepr}>
          <View style={styles.labelCmtWrapper}>
            <Icon name={getIcon()} style={styles.icon} />
            <Text style={styles.rankText}>{rankList[getComment()]}</Text>
          </View>
          <View style={styles.line2} />

          <View style={styles.cmtContent}>
            <Text style={styles.cmtText}>{commentList[getComment()]}</Text>
          </View>
        </View>
      </View>

      <View style={styles.btnCon}>
        <TouchableOpacity style={styles.btnStart} onPress={sportListPress}>
          <Text style={styles.textBtnStart}>Back to sport list</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStart} onPress={tryAgainPress}>
          <Text style={styles.textBtnStart}>Try again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyle = (overall: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    cardCon: {
      marginTop: 12,
    },
    btnCon: {
      flexDirection: 'row',
      gap: 16,
      marginHorizontal: 16,
      marginTop: 16,
    },
    btnStart: {
      height: 48,
      flex: 1,
      backgroundColor: colors.header,
      justifyContent: 'center',
      marginBottom: space.marginBottomBtn,
      borderRadius: 8,
    },
    textBtnStart: {
      color: colors.white,
      fontSize: font.fontBtnBottom,
    },
    resultWrapper: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 12,
    },
    line: {
      height: 0.8,
      backgroundColor: colors.black,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 8,
      marginBottom: 12,
      opacity: 0.4,
    },
    resultCon: {
      backgroundColor: colors.white,
      elevation: 6,
      width: '100%',
      borderRadius: 8,
    },
    resultLabel: {
      fontWeight: 'bold',
      color: colors.blue2,
      fontSize: 20,
      lineHeight: 24,
      marginTop: 8,
    },
    resultDetail: {
      flexDirection: 'row',
      gap: 80,
      paddingLeft: 40,
      paddingRight: 10,
      marginBottom: 12,
    },
    textDetail: {
      flex: 1,
      textAlign: 'left',
      fontSize: 17.2,
      lineHeight: 22,
    },
    icon: {
      height: 40,
      width: 40,
      color:
        overall >= 9
          ? colors.veryGood
          : overall >= 7
          ? colors.good
          : overall >= 5
          ? colors.neutral
          : overall >= 3
          ? colors.bad
          : colors.veryBad,
    },
    commentWrapepr: {
      marginTop: 20,
      borderRadius: 8,
      elevation: 8,
      backgroundColor: colors.white,
      width: '100%',
      paddingHorizontal: 10,
      paddingVertical: 12,
    },
    labelCmtWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 6,
    },
    rankText: {
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: 28,
      color:
        overall >= 9
          ? colors.veryGood
          : overall >= 7
          ? colors.good
          : overall >= 5
          ? colors.neutral
          : overall >= 3
          ? colors.bad
          : colors.veryBad,
    },
    line2: {
      height: 0.6,
      backgroundColor: colors.black,
      marginTop: 8,
      marginBottom: 12,
      opacity: 0.4,
    },
    cmtContent: {
      paddingHorizontal: 8,
    },
    cmtText: {
      fontSize: 16,
      lineHeight: 20,
      color:
        overall >= 9
          ? colors.veryGood
          : overall >= 7
          ? colors.good
          : overall >= 5
          ? colors.neutral
          : overall >= 3
          ? colors.bad
          : colors.veryBad,
      textAlign: 'justify',
    },
  });
