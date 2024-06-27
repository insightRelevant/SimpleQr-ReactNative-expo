// app/(tabs)/guest-list.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guest List</Text>
      <FlatList
        data={guests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GuestItem guest={item} />}
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
