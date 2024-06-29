import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GuestCountCard = ({ count }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Total de Invitados: {count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    margin: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semitransparente para resaltar sobre el gradiente
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Para Android
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GuestCountCard;
