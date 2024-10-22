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
        colors={['#ff9a9e', '#fecfef']}
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
    backgroundColor: '#f2f2f2',
  },
  card: {
    borderRadius: 20,
    width: '85%',
    height: '55%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5, // Para Android
  },
  linksContainer: {
    width: '100%',
    marginBottom: 20,
  },
  link: {
    paddingVertical: 14,
    paddingHorizontal: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    color: '#333',
    textAlign: 'center',
    borderRadius: 30,
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'none',
    marginBottom: 15, // Más espacio entre botones
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2, // Sombras para botones en Android
  },
  guestCountCard: {
    position: 'absolute',
    top: 30,
    right: 30,
    zIndex: 10,
  },
});

export default Page;
