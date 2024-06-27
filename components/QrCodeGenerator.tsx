import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { LinearGradient } from 'expo-linear-gradient';
import uuid from 'react-native-uuid';

const QrCodeGenerator = () => {
  const [name, setName] = useState('');
  const [qrValue, setQrValue] = useState('');
  const qrCodeRef = useRef(null);

  const handleGenerateQr = async () => {
    if (!name) {
      Alert.alert('No ingresaste un nombre para un invitado ;(');
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
      Alert.alert('Invitado agregado exitosamente! ;)');
      setName('');
    } catch (error) {
      console.error('Error saving guest', error);
    }
  };

  const handleShareQr = () => {
    if (!qrCodeRef.current) return;

    qrCodeRef.current.toDataURL((dataURL) => {
      const path = `${FileSystem.cacheDirectory}qr_code.png`;
      FileSystem.writeAsStringAsync(path, dataURL, {
        encoding: FileSystem.EncodingType.Base64,
      })
        .then(() => {
          Sharing.shareAsync(path);
        })
        .catch((error) => {
          console.error('Error sharing QR code', error);
        });
    });
  };

  return (
    <LinearGradient
      colors={['#ffafbd', '#ffc3a0']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Genera un Qr para un invitado!</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa un nombre"
          value={name}
          onChangeText={setName}
        />
        <Button title="Generar nuevo" onPress={handleGenerateQr} />
        {qrValue ? (
          <View style={styles.qrContainer}>
            <QRCode value={qrValue} size={200} color="black" getRef={(c) => (qrCodeRef.current = c)} />
            <Text style={styles.qrText}>QR Code: {qrValue}</Text>
            <Button title="Compartir" onPress={handleShareQr} />
          </View>
        ) : null}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'transparent', // Hace que el fondo del contenedor sea transparente para que se vea el gradiente
    
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white', // Color blanco para el título
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    backgroundColor: 'white', // Fondo blanco para el input
    borderRadius: 9,
    marginHorizontal: 100,
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal : 80,
  },
  qrText: {
    marginTop: 10,
    fontSize: 16,
    color: 'white', // Color blanco para el texto del QR
  },
});

export default QrCodeGenerator;
