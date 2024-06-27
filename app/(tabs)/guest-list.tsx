// app/(tabs)/guest-list.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import GuestItem from '../../components/GuestItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GuestListScreen = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const storedGuests = await AsyncStorage.getItem('guests');
        const guestsList = storedGuests ? JSON.parse(storedGuests) : [];
        setGuests(guestsList);
      } catch (error) {
        console.error('Error fetching guests', error);
      }
    };

    fetchGuests();
  }, []);

  const removeGuest = async (guestId) => {
    try {
      const updatedGuests = guests.filter(guest => guest.id !== guestId);
      setGuests(updatedGuests);
      await AsyncStorage.setItem('guests', JSON.stringify(updatedGuests));
    } catch (error) {
      console.error('Error removing guest', error);
    }
  };

  const clearGuests = async () => {
    try {
      await AsyncStorage.removeItem('guests');
      setGuests([]);
    } catch (error) {
      console.error('Error clearing guests', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guest List</Text>
      <Button title="Eliminar Lista Completa" onPress={clearGuests} />
      <FlatList
        data={guests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GuestItem guest={item} onDelete={removeGuest} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default GuestListScreen;
