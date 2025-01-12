import {createStackNavigator} from '@react-navigation/stack';
import {AccountInfo} from '../screens/AccountInfo/account-info';

const Stack = createStackNavigator();

export function InfoStack() {
  return (
    <Stack.Navigator
      initialRouteName={'Info'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Info" component={AccountInfo} />
    </Stack.Navigator>
  );
}
