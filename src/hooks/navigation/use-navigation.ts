import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type AppStackParamList = {
  Home: undefined;
  SportSelection: undefined;
};

type AppNavigationProp = StackNavigationProp<AppStackParamList>;

const useAppNavigation = () => {
  return useNavigation<AppNavigationProp>();
};

export default useAppNavigation;
