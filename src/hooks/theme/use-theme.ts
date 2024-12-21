import { useContext } from 'react';
import { ThemeContext } from '@react-navigation/native';

const useTheme = () => {
  const theme = useContext(ThemeContext);
  return theme?.colors;
};

export default useTheme;
