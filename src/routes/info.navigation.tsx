import {createStackNavigator} from '@react-navigation/stack';
import {AccountInfo} from '../screens/AccountInfo/account-info';
import {ChangePassword} from '../screens/ChangePassword/change-password';
import {ChangeInfo} from '../screens/ChangeInfo/change-info';

const Stack = createStackNavigator();

export function InfoStack() {
  return (
    <Stack.Navigator
      initialRouteName={'Info'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Info" component={AccountInfo} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ChangeInfo" component={ChangeInfo} />
    </Stack.Navigator>
  );
}
