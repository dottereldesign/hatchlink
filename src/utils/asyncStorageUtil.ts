import AsyncStorage from "@react-native-async-storage/async-storage";

if (typeof window !== "undefined") {
  (window as any).clearAsyncStorage = async () => {
    await debugAsyncStorage.clear();
  };
}

export const debugAsyncStorage = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      console.log(`[AsyncStorage] Setting item: ${key} = ${value}`);
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(
        `[AsyncStorage] Error setting item for key "${key}":`,
        error
      );
    }
  },
  async getItem(key: string): Promise<string | null> {
    try {
      console.log(`[AsyncStorage] Getting item: ${key}`);
      const value = await AsyncStorage.getItem(key);
      console.log(`[AsyncStorage] Fetched value for key "${key}": ${value}`);
      return value;
    } catch (error) {
      console.error(
        `[AsyncStorage] Error getting item for key "${key}":`,
        error
      );
      return null;
    }
  },
  async clear(): Promise<void> {
    try {
      console.log(`[AsyncStorage] Clearing all storage`);
      await AsyncStorage.clear();
      console.log(`[AsyncStorage] Storage cleared`);
    } catch (error) {
      console.error(`[AsyncStorage] Error clearing storage:`, error);
    }
  },
  async removeItem(key: string): Promise<void> {
    try {
      console.log(`[AsyncStorage] Removing item: ${key}`);
      await AsyncStorage.removeItem(key);
      console.log(`[AsyncStorage] Removed item: ${key}`);
    } catch (error) {
      console.error(
        `[AsyncStorage] Error removing item for key "${key}":`,
        error
      );
    }
  },
};
