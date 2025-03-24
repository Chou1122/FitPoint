import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {SportDetailProps} from '../../screens/SportDetail/sport-detail';

// Tab navigation parameter list
type TabParamList = {
  Home: undefined;
  SportSelection: undefined;
  RecordResult: undefined;
  Info: undefined;
  ChangePassword: undefined;
  ChangeInfo: undefined;
  ScreenEvent: undefined;
};

// Stack navigation parameter list
type StackParamList = {
  MainTab: undefined;
  Event: undefined;
  IntroScreen: undefined;
  Login: undefined;
  Profile: undefined;
  SportRecording: undefined;
  SportDetail: SportDetailProps;
  SportTutorial: undefined;
  ChangePassword: undefined;
  ForgetPassword: undefined;
  SignUp: undefined;
  EnterOTP: undefined;
  GetBackPass: undefined;
};

// Define the combined navigation prop
type AppNavigationProp = StackNavigationProp<StackParamList> &
  BottomTabNavigationProp<TabParamList>;

// Hook to use navigation with proper type safety
const useAppNavigation = () => {
  const navigation = useNavigation<AppNavigationProp>();
  return navigation;
};

export default useAppNavigation;
