import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import styles from './styles/LoginPage.styles'

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>CardiBalance</Text>
      <Text style={styles.subtitle}>Bem-vindo de Volta</Text>

      {/* Inputs */}
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} />

      {/* Esqueceu senha */}
      <TouchableOpacity>
        <Text style={styles.forgot}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      {/* Botão Entrar */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
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
