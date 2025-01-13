import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {theme} from '../../hooks/theme/theme';

const {colors} = theme;

interface LoadingSpinnerProps {
  isVisible: boolean;
}

export const LoadingSpinner = ({isVisible}: LoadingSpinnerProps) => {
  const styles = createStyle();

  return (
    <Modal animationType="none" visible={isVisible} transparent={true}>
      <View style={styles.overlay}>
        {/* Nền mờ */}
        <View style={styles.background} />
        {/* ActivityIndicator không bị mờ */}
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            size={Platform.OS === 'android' ? 60 : 'large'}
            color={colors.blue2}
          />
        </View>
      </View>
    </Modal>
  );
};

const createStyle = () =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    background: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.black,
      opacity: 0.2,
    },
    loaderContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
