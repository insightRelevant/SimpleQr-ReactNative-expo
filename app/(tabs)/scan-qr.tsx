// scan-qr.tsx

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { Camera, CameraView } from 'expo-camera'; // Asegúrate de importar correctamente la cámara de Expo

import { useAsyncStorage } from '../../hooks/useAsyncStorage'; // Ruta al gancho personalizado
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScanQRScreen = () => {
  const { getItem } = useAsyncStorage(); // Importamos getItem de useAsyncStorage
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
      // Obtener la lista de invitados desde AsyncStorage
      const storedGuests = await getItem('guests');
      const guestsList = storedGuests || [];

      // Verificar si el código QR escaneado está en la lista de invitados
      const foundGuest = guestsList.find((guest: { qrCode: any; }) => guest.qrCode === data);

      if (foundGuest) {
        // Invitado encontrado, manejar la lógica (marcar asistencia, mostrar mensaje, etc.)
        Alert.alert(`Welcome, ${foundGuest.name}!`);
        // Puedes agregar más lógica aquí, como marcar asistencia

      } else {
        // Invitado no encontrado
        Alert.alert('Guest not found in the list!');
      }

      setScanned(true);
    } catch (error) {
      console.error('Error scanning QR code', error);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'], // Puedes ajustar los tipos de códigos de barras según tus necesidades
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
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
});

export default ScanQRScreen;
