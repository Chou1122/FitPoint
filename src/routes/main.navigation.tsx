import {createStackNavigator} from '@react-navigation/stack';
import {RecordResult} from '../screens/RecordResult/record-result';
import {SportSelection} from '../screens/SportSelection/sport-selection';

const Stack = createStackNavigator();

export function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName={'SportSelection'}
      screenOptions={{headerShown: false}}>
      {/* @ts-ignore */}
      <Stack.Screen name="RecordResult" component={RecordResult} />
      <Stack.Screen name="SportSelection" component={SportSelection} />
    </Stack.Navigator>
  );
}
