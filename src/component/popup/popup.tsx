import React, {useEffect, useState} from 'react';
import {Modal, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

interface PopupProps {
  children: any;
  isVisible: boolean;
  onClose?: () => void;
  animationType?: 'slide' | 'none';
}

export const Popup = ({
  children,
  isVisible,
  onClose,
  animationType = 'slide',
}: PopupProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(isVisible);

  useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  const handleClose = () => {
    setModalVisible(false);
    onClose?.();
  };

  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.container}>{children}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
