// components/QrCodeGenerator.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const QrCodeGenerator = () => {
  const [name, setName] = useState('');
  const [qrValue, setQrValue] = useState('');

  const handleGenerateQr = async () => {
    if (!name) {
      alert('Please enter a name.');
      return;
    }

    const newGuest = {
      id: uuid.v4(),
      name,
      qrCode: `qr-${name}-${uuid.v4()}`,
    };

    setQrValue(newGuest.qrCode);

    try {
      const storedGuests = await AsyncStorage.getItem('guests');
      const guests = storedGuests ? JSON.parse(storedGuests) : [];
      guests.push(newGuest);
      await AsyncStorage.setItem('guests', JSON.stringify(guests));
      alert('Guest added successfully!');
      setName('');
    } catch (error) {
      console.error('Error saving guest', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate QR Code for Guest</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter guest name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Generate QR" onPress={handleGenerateQr} />
      {qrValue ? (
        <View style={styles.qrContainer}>
          <QRCode value={qrValue} size={200} />
          <Text>QR Code: {qrValue}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  qrContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default QrCodeGenerator;
