import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { LinearGradient } from 'expo-linear-gradient';
import uuid from 'react-native-uuid';

// Definición del componente funcional QrCodeGenerator
const QrCodeGenerator = () => {
  
  // Hook useState para gestionar el estado del nombre del usuario.npm audit fix
  // 'name' almacena el valor actual del nombre y 'setName' es la función para actualizarlo.
  // Inicialmente, 'name' es una cadena vacía.
  const [name, setName] = useState('');
  
  // Hook useState para gestionar el estado del valor del código QR.
  // 'qrValue' almacena el valor actual que será codificado en el QR y 'setQrValue' es la función para actualizarlo.
  // Inicialmente, 'qrValue' es una cadena vacía.
  const [qrValue, setQrValue] = useState('');
  
  // Hook useRef para crear una referencia mutable que no causa re-renderizaciones al cambiar.
  // 'qrCodeRef' se inicializa en null y será usado para referenciar el elemento del código QR.
  const qrCodeRef = useRef(null);

  // Función asíncrona que maneja la generación del código QR y la adición del invitado a la lista.
const handleGenerateQr = async () => {
  
  // Verifica si el nombre del invitado no está ingresado. Si es así, muestra una alerta y termina la ejecución de la función.
  if (!name) {
    Alert.alert('No ingresaste un nombre para un invitado ;(');
    return;
  }

  // Genera un ID único para el nuevo invitado usando la biblioteca 'uuid'.
  const uniqueId = uuid.v4();
  
  // Crea un nuevo objeto 'newGuest' con la información del invitado.
  // Incluye el ID único, el nombre ingresado, un valor QR que incluye el ID, y una propiedad 'scaned' inicializada en false.
  const newGuest = {
    id: uniqueId,
    name,
    qrCode: `qr-${uniqueId}`,
    scaned: false,
  };

  // Actualiza el estado 'qrValue' con el valor QR generado para el nuevo invitado.
  setQrValue(newGuest.qrCode);

  try {
    // Recupera la lista de invitados almacenada en AsyncStorage.
    const storedGuests = await AsyncStorage.getItem('guests');
    
    // Si hay datos almacenados, los parsea a un array; si no, inicializa un array vacío.
    const guests = storedGuests ? JSON.parse(storedGuests) : [];
    
    // Agrega el nuevo invitado a la lista de invitados.
    guests.push(newGuest);
    
    // Guarda la lista actualizada de invitados en AsyncStorage.
    await AsyncStorage.setItem('guests', JSON.stringify(guests));
    
    // Muestra una alerta confirmando que el invitado fue agregado exitosamente.
    Alert.alert('Invitado agregado exitosamente! ;)');
    
    // Limpia el campo de nombre estableciendo su valor como una cadena vacía.
    setName('');
  } catch (error) {
    // En caso de error al guardar el invitado, lo muestra en la consola.
    console.error('Error saving guest', error);
  }
};

// Función que maneja el compartir del código QR.
const handleShareQr = () => {
  // Verifica si la referencia al código QR existe. Si no, termina la ejecución.
  if (!qrCodeRef.current) return;

  // Convierte el código QR en una imagen en formato Base64.
  qrCodeRef.current.toDataURL((dataURL: any) => {
    
    // Define una ruta en la caché del sistema de archivos donde se guardará la imagen del código QR.
    const path = `${FileSystem.cacheDirectory}qr_code.png`;
    
    // Guarda la imagen en la ruta especificada en formato Base64.
    FileSystem.writeAsStringAsync(path, dataURL, {
      encoding: FileSystem.EncodingType.Base64,
    })
      .then(() => {
        // Si la imagen se guardó correctamente, la comparte usando las opciones de compartir del dispositivo.
        Sharing.shareAsync(path);
      })
      .catch((error) => {
        // En caso de error al compartir el código QR, lo muestra en la consola.
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
