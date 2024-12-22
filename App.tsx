import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './src/screens/Home/home';
import {SportSelection} from './src/screens/SportSelection/sport-selection';
import {SportDetail} from './src/screens/SportDetail/sport-detail';
import {SportTutorial} from './src/screens/SportTutorial/sport-tutorial';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SportSelection"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SportSelection" component={SportSelection} />
        {/* @ts-ignore */}
        <Stack.Screen name="SportDetail" component={SportDetail} />
        <Stack.Screen name="SportTutorial" component={SportTutorial} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
