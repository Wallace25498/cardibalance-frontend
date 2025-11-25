import { AUTH_TOKEN_STORAGE, USER_STORAGE } from "@/storage/storageConfigs";
import AsyncStorage from "@react-native-async-storage/async-storage";

// --- GESTÃO DO TOKEN ---

export async function storageAuthTokenSave(token: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
}

export async function storageAuthTokenGet() {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
  return token;
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}

// --- GESTÃO DO USUÁRIO (Novo!) ---

export interface UserDTO {
  name: string;
  email: string;
  role: string;
}

export async function storageUserSave(user: UserDTO) {
  // Converte o objeto para string JSON antes de salvar
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet() {
  const storage = await AsyncStorage.getItem(USER_STORAGE);
  const user: UserDTO = storage ? JSON.parse(storage) : {};
  return user;
}

export async function storageUserRemove() {
  await AsyncStorage.removeItem(USER_STORAGE);
}