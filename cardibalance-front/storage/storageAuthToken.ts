import AsyncStorage from "@react-native-async-storage/async-storage"

import { AUTH_TOKEN_STORAGE } from "@/storage/storageConfigs";

type StorageAuthTokenProps = {
  token : string
}

// Funções relacionadas ao Gerenciamento do TOKEN armazenado
//salva o token
export async function storageAuthSave(p0: string, token: StorageAuthTokenProps){
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify(token))
}

//busca o token no armazenamento local
export async function storageAuthTokenGet (){
  const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

  const token : StorageAuthTokenProps = response ? JSON.parse(response) : {}

  return token;
}

//apaga o token quando deslogar
export async function storageAuthRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}
