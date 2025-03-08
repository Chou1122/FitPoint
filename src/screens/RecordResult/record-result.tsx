import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {CustomText as Text} from '../../component/text-custom/text-custom';
import {Header} from '../../component/header/header';
import {theme} from '../../hooks/theme/theme';
import useAppNavigation from '../../hooks/navigation/use-navigation';
import {SportCard} from '../SportSelection/sport-card/sport-card';
import {Icon, IconName} from '../../component/icon/icon';
import {useRoute} from '@react-navigation/native';
import {RecordResultProps} from './record-result.interface';
import {roundToTwo} from '../../helpers/number.helper';
import {formatSecondsToMMSS} from '../../helpers/time.helper';
import {mockCmt, mockRank} from './mock-result';

const {colors, font, space} = theme;

export const RecordResult = () => {
  const route = useRoute();
  const params = route.params;

  //@ts-ignore
  const {id, time, img, name} = params;

  // @ts-ignore
  const result: RecordResultProps = route.params.videoResult;

  const navigation = useAppNavigation();

  const [duration, setDuration] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(71.237);
  const [formTechnique, setFormTechnique] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);
  const [durationScore, setDurationScore] = useState<number>(0);
  const [speedScore, setSpeedScore] = useState<number>(0);

  const [overall, setOverall] = useState<number>(6.017);

  const [commentList, setCommentList] = useState<string[]>(mockCmt);
  const [rankList, setRankList] = useState<string[]>(mockRank);

  const styles = createStyle(
    accuracy,
    formTechnique,
    durationScore,
    speedScore,
    overall,
  );

  useEffect(() => {
    setDuration(roundToTwo(result?.duration, 0) ?? 0);
    setTotal(roundToTwo(result?.total, 2) ?? 0);
    setAccuracy(roundToTwo(result?.accuracy, 2) ?? 0);
    setFormTechnique(roundToTwo(result?.form_technique, 2) ?? 0);
    setSpeed(roundToTwo(result?.speed, 2) ?? 0);
    setOverall(roundToTwo(result?.overall, 2) ?? 0);
    setDurationScore(result?.duration_score ?? 0);
    setSpeedScore(roundToTwo(result?.speed_score, 2) ?? 0);
  }, [result]);

  const onBack = () => {
    //@ts-ignore
    navigation.navigate('SportDetail', {id: id});
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
        <SportCard
          id={id}
          showVideo={false}
          onPressCard={onBack}
          time={time}
          name={name}
          img={img}
        />
      </View>

      <View style={styles.resultWrapper}>
        <View style={styles.resultCon}>
          <Text style={styles.resultLabel}>Your result</Text>

          <View style={styles.line} />

          <View style={styles.resultDetail}>
            <Text style={styles.textDetail}>Duration:</Text>
            <Text style={styles.durationText}>
              {formatSecondsToMMSS(duration)}
            </Text>
          </View>

          <View style={styles.resultDetail}>
            <Text style={styles.textDetail}>Total:</Text>
            <Text style={styles.textDetail}>{total}</Text>
          </View>

          <View style={styles.resultDetail}>
            <Text style={styles.textDetail}>Accuracy:</Text>
            <Text style={styles.accuracyText}>{accuracy}%</Text>
          </View>

          <View style={styles.resultDetail}>
            <Text style={styles.textDetail}>Technique:</Text>
            <Text style={styles.tecniqueText}>{formTechnique}%</Text>
          </View>

          <View style={styles.resultDetail}>
            <Text style={styles.textDetail}>Speed:</Text>
            <Text style={styles.speedText}>{speed}/s</Text>
          </View>

          <View style={styles.line} />

          <View style={styles.resultDetail}>
            <Text style={styles.textDetail}>Overall:</Text>
            <Text style={styles.overallText}>{overall}</Text>
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

const createStyle = (
  accuracy: number,
  technique: number,
  durationScore: number,
  speedScore: number,
  overall: number,
) =>
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
    overallText: {
      flex: 1,
      textAlign: 'left',
      fontSize: 17.2,
      lineHeight: 22,
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
    accuracyText: {
      flex: 1,
      textAlign: 'left',
      fontSize: 17.2,
      lineHeight: 22,
      color:
        accuracy >= 90
          ? colors.veryGood
          : accuracy >= 70
          ? colors.good
          : accuracy >= 50
          ? colors.neutral
          : accuracy >= 30
          ? colors.bad
          : colors.veryBad,
    },
    tecniqueText: {
      flex: 1,
      textAlign: 'left',
      fontSize: 17.2,
      lineHeight: 22,
      color:
        technique >= 90
          ? colors.veryGood
          : technique >= 70
          ? colors.good
          : technique >= 50
          ? colors.neutral
          : technique >= 30
          ? colors.bad
          : colors.veryBad,
    },
    durationText: {
      flex: 1,
      textAlign: 'left',
      fontSize: 17.2,
      lineHeight: 22,
      color:
        durationScore >= 90
          ? colors.veryGood
          : durationScore >= 70
          ? colors.good
          : durationScore >= 50
          ? colors.neutral
          : durationScore >= 30
          ? colors.bad
          : colors.veryBad,
    },
    speedText: {
      flex: 1,
      textAlign: 'left',
      fontSize: 17.2,
      lineHeight: 22,
      color:
        speedScore >= 90
          ? colors.veryGood
          : speedScore >= 70
          ? colors.good
          : speedScore >= 50
          ? colors.neutral
          : speedScore >= 30
          ? colors.bad
          : colors.veryBad,
    },
  });
