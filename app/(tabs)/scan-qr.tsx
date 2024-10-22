import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { useAsyncStorage } from '../../hooks/useAsyncStorage';

const ScanQRScreen = () => {
  const { getItem, setItem } = useAsyncStorage();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    try {
      const storedGuests = await getItem('guests');
      const guestsList = storedGuests || [];
      const foundGuest = guestsList.find((guest: any) => guest.qrCode === data);

      if (foundGuest) {
        if (foundGuest.status === 'ingresado') {
          Alert.alert('Este invitado ya ingresó a la fiesta!');
        } else {
          const updatedGuestsList = guestsList.map((guest: any) =>
            guest.qrCode === data ? { ...guest, status: 'ingresado' } : guest
          );
          await setItem('guests', updatedGuestsList);
          Alert.alert(`Bienvenido, ${foundGuest.name}!`, undefined, [
            {
              text: 'OK',
              onPress: () => {
                setScanned(false); // Reinicia el escaneo
              },
            },
          ]);
        }
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
    return <Text>Solicitando permisos para utilizar la cámara</Text>;
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
          <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
            <Text style={styles.buttonText}>Escanear de nuevo</Text>
          </TouchableOpacity>
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
  button: {
    backgroundColor: '#007BFF', // Color de fondo
    paddingVertical: 10, // Espaciado vertical
    paddingHorizontal: 20, // Espaciado horizontal
    borderRadius: 25, // Bordes redondeados
    shadowColor: '#000', // Color de sombra
    shadowOffset: { width: 0, height: 4 }, // Tamaño de sombra
    shadowOpacity: 0.3, // Opacidad de sombra
    shadowRadius: 6, // Difuminado de sombra
    elevation: 5, // Elevación en Android
  },
  buttonText: {
    color: '#FFFFFF', // Color del texto
    fontSize: 16, // Tamaño de fuente
    fontWeight: 'bold', // Negrita
    textAlign: 'center', // Alineación del texto
  },
});

export default ScanQRScreen;