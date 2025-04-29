import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Header} from '../../component/header/header';
import {CustomText as Text} from '../../component/text-custom/text-custom';
import {theme} from '../../hooks/theme/theme';
// @ts-ignore
import MonthPicker from 'react-native-month-picker';
import {Icon, IconName} from '../../component/icon/icon';
import {
  formatMonthYear,
  getDaysInMonth,
  getMonthName,
} from '../../helpers/date.helper';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {LoadingSpinner} from '../../component/loadingSpinner/loading-spinner';
import {API_URL} from '@env';
import {formatSecondsToMMSS} from '../../helpers/time.helper';

export const Event = () => {
  const userInfo = useSelector((state: any) => state.userInfo);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [history, setHistory] = useState<any>([]);
  const [historyFiltered, setHistoryFiltered] = useState<any>([]);
  const [dayTotal, setDayTotal] = useState<any>({});

  const goToPreviousMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  const handleMonthChange = (date: any) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    setOpen(false);
    setSelectedDate(newDate);
  };

  const toggleCalendar = () => {
    setOpen(!open);
  };

  const getAllSportHistory = async () => {
    setIsloading(true);

    try {
      //@ts-ignore
      const response = await axios.get(`${API_URL}/get-all-sport-historys`, {
        params: {
          userId: userInfo.id,
        },
      });
      setIsloading(false);

      setHistory(response.data);
    } catch (error: any) {
      setIsloading(false);
    }
  };

  useEffect(() => {
    getAllSportHistory();
  }, [selectedDate]);

  useEffect(() => {
    const tmp = filterByMonth(history, selectedDate);
    setHistoryFiltered(tmp);
    const tmp2 = countByDayOnly(tmp);
    setDayTotal(tmp2);
    // console.log('', JSON.stringify(tmp));
  }, [history, selectedDate]);

  const filterByMonth = (data: any, date: Date) => {
    const targetMonth = date.getMonth();
    const targetYear = date.getFullYear();

    return data.filter((item: any) => {
      const itemDate = new Date(item.time);
      return (
        itemDate.getMonth() === targetMonth &&
        itemDate.getFullYear() === targetYear
      );
    });
  };

  const countByDayOnly = (data: any) => {
    const dayCount = {};

    data.forEach((item: any) => {
      const date = new Date(item.time);
      const day = date.getDate();

      //@ts-ignore
      if (!dayCount[day]) {
        //@ts-ignore
        dayCount[day] = 0;
      }
      //@ts-ignore
      dayCount[day]++;
    });

    return dayCount;
  };

  const countObjectKeys = (obj: any) => {
    return Object.keys(obj).length;
  };

  const countUniqueSportIds = (data: any) => {
    const uniqueSportIds = new Set();

    data.forEach((item: any) => {
      if (item.sportId != null) {
        uniqueSportIds.add(item.sportId);
      }
    });

    return uniqueSportIds.size;
  };

  const sumDuration = (data: any) => {
    return data.reduce((total: any, item: any) => {
      // Nếu duration không null thì cộng vào tổng
      if (item.duration !== null && item.duration !== undefined) {
        return total + item.duration;
      }
      return total;
    }, 0);
  };

  const calculateHighScoreRate = (data: any) => {
    if (data.length === 0) return 0;

    const highScoreCount = data.filter((item: any) => item.scores >= 8).length;
    const rate = (highScoreCount / data.length) * 100;

    return rate.toFixed(0); // làm tròn 2 chữ số sau dấu phẩy
  };

  //

  const renderDay = (day: number) => {
    const total = dayTotal[day];

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={[
          styles.dayWorkout,
          {
            backgroundColor:
              total >= 10
                ? theme.colors.blue2
                : total >= 5
                ? theme.colors.blue
                : total >= 2
                ? theme.colors.blue4
                : total >= 1
                ? theme.colors.gray
                : theme.colors.gray3,
          },
        ]}>
        <Text style={styles.workoutText}>{total}</Text>
      </TouchableOpacity>
    );
  };

  const renderDayWorkout = () => {
    return (
      <View style={styles.allDayWrapper2}>
        {Array.from({length: getDaysInMonth(selectedDate)}).map((_, i) => (
          <View key={i}>{renderDay(i)}</View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={'Workout statistic'} btnGoBack={false} />

      <View style={styles.dateCon}>
        <View style={styles.dateWrapper}>
          <View style={styles.dateMonWrapper}>
            <TouchableOpacity onPress={goToPreviousMonth}>
              <Icon name={IconName['icon-previous']} style={styles.iconBack} />
            </TouchableOpacity>
            <Text>{formatMonthYear(selectedDate)}</Text>

            <TouchableOpacity onPress={goToNextMonth}>
              <Icon name={IconName['icon-next']} style={styles.iconNext} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.btnCalendar} onPress={toggleCalendar}>
          <Icon name={IconName['icon-calendar']} style={styles.iconCalendar} />
        </TouchableOpacity>
      </View>
      {open && (
        <View style={styles.calendarCon}>
          <MonthPicker
            onMonthChange={handleMonthChange}
            selectedDate={selectedDate}
            minimumDate={new Date(2020, 0)}
            maximumDate={new Date(2030, 11)}
            selectedBackgroundColor={theme.colors.blue4}
            selectedMonthTextStyle={{color: theme.colors.white}}
            seperatorHeight={1}
            seperatorColor={theme.colors.blue4}
            containerStyle={{
              backgroundColor: theme.colors.header,
              padding: 4,
              borderRadius: 18,
            }}
            currentMonthTextStyle={{color: theme.colors.background}}
            monthTextStyle={{color: theme.colors.white}}
            monthDisabledStyle={{color: theme.colors.gray3}}
          />
        </View>
      )}

      <LoadingSpinner isVisible={isLoading} />

      <ScrollView>
        <View style={styles.section1Wrapper}>
          <View style={styles.label1Wrapper}>
            <Text style={styles.textLabel1}>
              {`Your workout intensity for ${getMonthName(selectedDate)}:`}
            </Text>
          </View>

          <View style={styles.allDayWrapper}>{renderDayWorkout()}</View>
        </View>

        <View style={styles.section2Wrapper}>
          <View style={styles.label2Wrapper}>
            <Text style={styles.textLabel1}>
              {`Your workout statistics for ${getMonthName(selectedDate)}:`}
            </Text>
          </View>

          <View style={styles.staticWrapper}>
            <View style={styles.static2Wrapper}>
              <Text style={styles.textLabelStatic}>
                Total number of workout days:
              </Text>
              <Text style={styles.textNumStatic}>
                {countObjectKeys(dayTotal)}
              </Text>
            </View>
          </View>

          <View style={styles.staticWrapper}>
            <View style={styles.static2Wrapper}>
              <Text style={styles.textLabelStatic}>
                Total different exercises:
              </Text>
              <Text style={styles.textNumStatic}>
                {countUniqueSportIds(historyFiltered)}
              </Text>
            </View>
          </View>

          <View style={styles.staticWrapper}>
            <View style={styles.static2Wrapper}>
              <Text style={styles.textLabelStatic}>
                Total workout sessions:
              </Text>
              <Text style={styles.textNumStatic}>
                {historyFiltered?.length}
              </Text>
            </View>
          </View>

          <View style={styles.staticWrapper}>
            <View style={styles.static2Wrapper}>
              <Text style={styles.textLabelStatic}>
                Total workout duration:
              </Text>
              <Text style={styles.textNumStatic}>
                {formatSecondsToMMSS(sumDuration(historyFiltered))}
              </Text>
            </View>
          </View>

          <View style={styles.staticWrapper}>
            <View style={styles.static2Wrapper}>
              <Text style={styles.textLabelStatic}>
                Workout completion rate:
              </Text>
              <Text style={styles.textNumStatic}>
                {calculateHighScoreRate(historyFiltered)}%
              </Text>
            </View>
          </View>

          {/*  */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarCon: {
    position: 'absolute',
    top: 110,
    left: 100,
    width: 320,
    height: 300,
    zIndex: 100,
  },
  dateCon: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
  },
  dateWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateMonWrapper: {
    width: 240,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 40,
  },
  btnCalendar: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCalendar: {
    width: 32,
    height: 32,
  },
  iconNext: {
    width: 28,
    height: 28,
  },
  iconBack: {
    width: 29,
    height: 29,
  },
  label1Wrapper: {
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 12,
    marginBottom: 8,
  },
  textLabel1: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 18,
  },
  allDayWrapper: {
    width: '100%',
    paddingHorizontal: 28,
  },
  allDayWrapper2: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  dayWorkout: {
    width: 28,
    aspectRatio: 1,
    borderRadius: 6,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutText: {
    color: theme.colors.white0d8,
  },
  label2Wrapper: {
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 12,
    marginBottom: 8,
  },
  section1Wrapper: {
    backgroundColor: 'white',
    paddingBottom: 16,
    paddingTop: 12,
    marginTop: 12,
    marginHorizontal: 8,
    borderRadius: 12,
    elevation: 8,
  },
  section2Wrapper: {
    backgroundColor: 'white',
    paddingBottom: 16,
    paddingTop: 12,
    marginTop: 14,
    marginHorizontal: 8,
    borderRadius: 12,
    elevation: 8,
  },
  staticWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  static2Wrapper: {
    backgroundColor: theme.colors.gray,
    width: '95%',
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textLabelStatic: {
    flex: 2,
    textAlign: 'left',
    paddingLeft: 12,
    fontSize: 16,
  },
  textNumStatic: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 12,
  },
});
