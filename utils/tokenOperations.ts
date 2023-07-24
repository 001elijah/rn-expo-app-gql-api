import * as SecureStore from 'expo-secure-store';

export async function getToken(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return null;
  }
}

export async function keepToken(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}