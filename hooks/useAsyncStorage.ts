// hooks/useAsyncStorage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = () => {
  const getItem = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting item ${key}`, error);
    }
  };

  const setItem = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key}`, error);
    }
  };

  return {
    getItem,
    setItem,
  };
};
