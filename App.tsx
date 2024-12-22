import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';

import {NavigationContainer, ThemeProvider} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './src/screens/Home/Home';
import {SportSelection} from './src/screens/SportSelection/SportSelction';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SportSelection" component={SportSelection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
