// components/GuestItem.tsx

// components/GuestItem.tsx

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GuestItem = ({ guest, onDelete, clearGuests }) => {
  return (
    <LinearGradient
      colors={['#ffafbd', '#ffc3a0']} // Colores pastel para el difuminado
      start={[0, 0]}
      end={[1, 1]}
      style={styles.card}
    >
      <View style={styles.content}>
        <Text style={styles.name}>{guest.name}</Text>
        <Text style={styles.qrCode}>{guest.qrCode}</Text>
        <Button title="Eliminar" onPress={() => onDelete(guest.id)} />
        

      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Para Android
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semitransparente para el contenido
    borderRadius: 8,
    padding: 16,
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
