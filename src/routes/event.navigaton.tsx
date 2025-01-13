import {createStackNavigator} from '@react-navigation/stack';
import {Event} from '../screens/Event/event';

const Stack = createStackNavigator();

export function EventStack() {
  return (
    <Stack.Navigator
      initialRouteName={'ScreenEvent'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ScreenEvent" component={Event} />
    </Stack.Navigator>
  );
}
