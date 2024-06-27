import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const Page = () => {
  return (
    <View style={styles.card}>
      <LinearGradient
        colors={['#ffafbd', '#ffc3a0']} // Colores pastel para el difuminado
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <Link style={styles.link} href="generate-qr">GENERAR QR</Link>
          <Link style={styles.link} href="guest-list">LISTA</Link>
          <Link style={styles.link} href="scan-qr">ESCANEAR QR</Link>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden', // Para que los bordes redondeados no se vean cortados por los links
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Para Android
  },
  gradient: {
    borderRadius: 12,
  },
  container: {
    marginTop : 270,
    marginBottom :200,
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  link: {
    marginVertical: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'transparent', // Fondo transparente para mostrar el gradiente detrás
    color: '#fff',
    textAlign: 'center',
    borderRadius: 8,
    width: '100%', // Ajustar el ancho al contenedor
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'none', // Para quitar la subrayado predeterminado de los enlaces
  },
});

export default Page;
