// app/(tabs)/generate-qr.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import QrCodeGenerator from '../../components/QrCodeGenerator';

const GenerateQrScreen = () => {
  return (
    <View style={styles.container}>
      <QrCodeGenerator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default GenerateQrScreen;
