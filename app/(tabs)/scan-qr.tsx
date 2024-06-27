import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { useAsyncStorage } from '../../hooks/useAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScanQRScreen = () => {
  const { getItem } = useAsyncStorage();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    try {
      const storedGuests = await getItem('guests');
      const guestsList = storedGuests || [];
      const foundGuest = guestsList.find((guest) => guest.qrCode === data);

      if (foundGuest) {
        Alert.alert(`Bienvenido, ${foundGuest.name}!`, undefined, [
          {
            text: 'OK',
            onPress: () => {
              setScanned(false); // Reinicia el escaneo
            },
          },
        ]);
      } else {
        Alert.alert('Invitado no encontrado en la lista!', undefined, [
          {
            text: 'OK',
            onPress: () => {
              setScanned(false); // Reinicia el escaneo
            },
          },
        ]);
      }

      setScanned(true);
    } catch (error) {
      console.error('Error al escanear el QR', error);
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permisos para utilizar la camara</Text>;
  }
  if (hasPermission === false) {
    return <Text>Acceso denegado</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View style={styles.scanAgainButton}>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scanAgainButton: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default ScanQRScreen;
