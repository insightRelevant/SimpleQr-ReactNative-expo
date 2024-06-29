import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import GuestCountCard from '../components/GuestCountCard';
import { useAsyncStorage } from '../hooks/useAsyncStorage';

const Page = () => {
  const [guestCount, setGuestCount] = useState(0);
  const { getItem } = useAsyncStorage();

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const storedGuests = await getItem('guests');
        const guests = storedGuests || [];
        setGuestCount(guests.length);
      } catch (error) {
        console.error('Error fetching guests:', error);
      }
    };

    fetchGuests();
  }, [getItem]);

  return (
    <View style={styles.container}>
      {/* Tarjeta con fondo gradiente */}
      <LinearGradient
        colors={['#ffafbd', '#ffc3a0']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.card}
      >
        <View style={styles.linksContainer}>
          <Link style={styles.link} href="generate-qr">GENERAR QR</Link>
          <Link style={styles.link} href="guest-list">LISTA</Link>
          <Link style={styles.link} href="scan-qr">ESCANEAR QR</Link>
        </View>

        {/* Tarjeta con contador de invitados superpuesta */}
        <GuestCountCard count={guestCount} style={styles.guestCountCard} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 12,
    width: '80%',
    height: '60%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Para Android
  },
  linksContainer: {
    width: '100%',
    marginBottom: 20,
  },
  link: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: '#fff',
    textAlign: 'center',
    borderRadius: 8,
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'none',
    marginBottom: 10, // Espacio entre cada botón
  },
  guestCountCard: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
});

export default Page;
