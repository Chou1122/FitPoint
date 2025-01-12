import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SportDetail} from './src/screens/SportDetail/sport-detail';
import {SportTutorial} from './src/screens/SportTutorial/sport-tutorial';
import {SportRecording} from './src/screens/SportRecording/sport-recording';
import {IntroScreen} from './src/screens/Intro/intro-screen';
import {Waiting} from './src/screens/Waiting/Waiting';
import {Login} from './src/screens/Login/login';
import {AccountInfo} from './src/screens/AccountInfo/account-info';

import {theme} from './src/hooks/theme/theme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainStack} from './src/routes/main.navigation';
import {Icon, IconName} from './src/component/icon/icon';
import {CustomText as Text} from './src/component/text-custom/text-custom';
import {StyleSheet} from 'react-native';

const {space, colors, font} = theme;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: space.tabBarHeight,
        },
        tabBarIcon: ({color}) => {
          let iconName: IconName = IconName['icon-home'];

          if (route.name === 'Home') {
            iconName = IconName['icon-home'];
          } else if (route.name === 'Profile') {
            iconName = IconName['icon-profile'];
          }

          return (
            <Icon
              name={iconName}
              style={{
                height: space.iconBottomTab,
                width: space.iconBottomTab,
                color: color,
              }}
            />
          );
        },
        tabBarLabel: ({focused, color}) => {
          return (
            <Text
              style={{
                color: focused ? colors.header : color,
                fontSize: font.fontTabBottom,
                lineHeight: space.lineHeightTab,
                fontWeight: 'bold',
              }}>
              {route.name}
            </Text>
          );
        },
        tabBarActiveTintColor: colors.header,
        tabBarInactiveTintColor: colors.gray3,
      })}>
      <Tab.Screen name="Home" component={MainStack} />
      <Tab.Screen name="Profile" component={AccountInfo} />
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {
  // Check is first time use app
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  const checkFirstLaunch = async () => {
    try {
      const firstValue = await AsyncStorage.getItem('first-time-use');
      if (firstValue === null || firstValue === 'false') {
        setInitialRoute('IntroScreen');
      } else {
        setInitialRoute('MainTab');
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra AsyncStorage:', error);
      setInitialRoute('MainTab');
    }
  };

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  if (initialRoute === null) {
    return <Waiting />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{headerShown: false}}>
        {/* Before Login */}
        <Stack.Screen name="Login" component={Login} />
        {/* After Login */}
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="MainTab" component={MainTabs} />

        {/* @ts-ignore */}
        <Stack.Screen name="SportDetail" component={SportDetail} />
        <Stack.Screen name="SportTutorial" component={SportTutorial} />
        <Stack.Screen name="SportRecording" component={SportRecording} />

        <Stack.Screen name="Info" component={AccountInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
