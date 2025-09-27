import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import styles from './styles/RegisterScreen.styles'

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Cadastro</Text>

      {/* Inputs */}
      <TextInput
        placeholder="Nome Completo"
        style={styles.input}
        placeholderTextColor="grey"
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        placeholderTextColor="grey"
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="grey"
      />
      <TextInput
        placeholder="Confirmar a sua senha"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="grey"
      />
      <TextInput
        placeholder="CPF/CNPJ"
        style={styles.input}
        keyboardType="numeric"
        placeholderTextColor="grey"
      />

      {/* Botão Cadastrar */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Link para login */}
      <Text style={styles.login}>
        Já possui uma conta? <Text style={styles.link}>Entre</Text>
      </Text>
    </View>
  )
}
