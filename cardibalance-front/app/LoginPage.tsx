import { AntDesign } from '@expo/vector-icons'
import axios from 'axios'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { useAuth } from "./context/AuthContext"
import styles from './styles/LoginPage.styles'

// IMPORTANTE: Certifique-se de ter atualizado o storageAuthToken.ts conforme o passo anterior
import { storageAuthTokenSave, storageUserSave } from '@/storage/storageAuthToken'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  
  const router = useRouter()
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos!')
      return
    }

    setLoading(true)
    try {
      console.log("Iniciando requisição de login...");
      
      const response = await axios.post('http://localhost:8080/auth/login', {
        email: email,
        password: senha
      })

      console.log('API respondeu. Dados:', response.data);

      const { token, userInfo } = response.data;

      // Salvando dados
      console.log("Salvando token...");
      await storageAuthTokenSave(token);
      
      console.log("Salvando usuário...");
      await storageUserSave(userInfo);

      // Atualiza contexto
      if (login) login();

      console.log("Navegando para Home...");
      
      // Navegação direta (sem esperar clique em OK)
      router.replace("/");

    } catch (error: any) {
      console.error('ERRO NO LOGIN:', error);
      
      // Se o erro for de código (ex: storageUserSave is not a function), vai aparecer aqui
      if (error.message && error.message.includes('storageUserSave')) {
        Alert.alert('Erro Interno', 'O arquivo storageAuthToken.ts não foi atualizado.');
      } else {
        const mensagemErro = error.response?.data?.message || 'Verifique suas credenciais.';
        Alert.alert('Falha no Login', mensagemErro);
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>CardiBalance</Text>
      <Text style={styles.subtitle}>Bem-vindo de Volta</Text>

      {/* Inputs */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />

      {/* Esqueceu senha */}
      <TouchableOpacity onPress={() => Alert.alert('Info', 'Funcionalidade em desenvolvimento')}>
        <Text style={styles.forgot}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      {/* Botão Entrar */}
      <TouchableOpacity 
        onPress={handleLogin} 
        style={[styles.button, loading && { opacity: 0.7 }]} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      {/* Cadastro */}
      <TouchableOpacity onPress={() => router.push('/RegisterScreen')}>
        <Text style={styles.register}>
          Ainda não tem uma conta? <Text style={styles.link}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>

      {/* Login com Google */}
      <TouchableOpacity style={styles.googleButton} onPress={() => Alert.alert('Info', 'Login com Google em breve')}>
        <AntDesign name="google" size={20} color="#DB4437" />
        <Text style={styles.googleText}>Fazer login com o Google</Text>
      </TouchableOpacity>
    </View>
  )
}