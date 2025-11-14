import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import axios from 'axios'
import styles from './styles/LoginPage.styles'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !senha) {
      alert('Preencha todos os campos!')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email: email,
        password: senha
      })

      console.log('Login bem-sucedido:', response.data)
      alert('Login OK!')
      // aqui você pode salvar o token e navegar para a tela principal
      // await AsyncStorage.setItem('token', response.data.token)
    } catch (error: any) {
      console.error('Erro ao fazer login:', error.response?.data || error.message)
      alert('Credenciais inválidas')
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
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />

      {/* Esqueceu senha */}
      <TouchableOpacity>
        <Text style={styles.forgot}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      {/* Botão Entrar */}
      <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
      </TouchableOpacity>

      {/* Cadastro */}
      <Text style={styles.register}>
        Ainda não tem uma conta? <Text style={styles.link}>Cadastre-se</Text>
      </Text>

      {/* Login com Google */}
      <TouchableOpacity style={styles.googleButton}>
        <AntDesign name="google" size={20} color="#DB4437" />
        <Text style={styles.googleText}>Fazer login com o Google</Text>
      </TouchableOpacity>
    </View>
  )
}
