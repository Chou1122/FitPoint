import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { SportDetailProps } from '../../screens/SportDetail/sport-detail';

type AppStackParamList = {
  Home: undefined;
  SportSelection: undefined;
  SportDetail: SportDetailProps;
  SportTutorial: undefined;
  SportRecording: undefined;
};

type AppNavigationProp = StackNavigationProp<AppStackParamList>;

const useAppNavigation = () => {
  return useNavigation<AppNavigationProp>();
};

export default useAppNavigation;
