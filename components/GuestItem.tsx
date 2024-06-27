// components/GuestItem.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GuestItem = ({ guest }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{guest.name}</Text>
      <Text style={styles.qrCode}>{guest.qrCode}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qrCode: {
    fontSize: 14,
    color: '#555',
  },
});

export default GuestItem;
