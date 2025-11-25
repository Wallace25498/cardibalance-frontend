import { storageAuthTokenSave, storageUserSave } from '@/storage/storageAuthToken'
import axios from 'axios'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { useAuth } from "./context/AuthContext"
import styles from './styles/RegisterScreen.styles'

export default function RegisterScreen() {

  const router = useRouter()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [cpf, setCpf] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth();

  const handleRegister = async () => {
    if (!nome || !email || !senha || !confirmarSenha || !cpf) {
      alert('Preencha todos os campos!')
      return
    }
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!')
      return
    }
    setLoading(true)
    try {

      const response = await axios.post('http://localhost:8080/auth/register', {
        nome,
        email,
        senha,
        cpfCnpj: cpf, // nome correto
        tipo: 'PACIENTE' // ou outro tipo conforme sua lógica

      })
      
      alert('Cadastro realizado com sucesso!')

     const response2 = await axios.post('http://localhost:8080/auth/login', {
        email: email,
        password: senha
      })
      login();
      await storageAuthTokenSave(response.data.token)

      await storageUserSave(response.data.user)
      router.push('/PatientDataScreen')

    } catch (error: any) {
      console.error('Erro ao cadastrar:', error.response?.data || error.message)
      alert('Erro ao cadastrar!')

    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Cadastro</Text>

      {/* Inputs */}
      <TextInput
        placeholder="Nome Completo"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        placeholderTextColor="grey"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        placeholderTextColor="grey"
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="grey"
      />
      <TextInput
        placeholder="Confirmar a sua senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="grey"
      />
      <TextInput
        placeholder="CPF/CNPJ"
        value={cpf}
        onChangeText={setCpf}
        style={styles.input}
        keyboardType="numeric"
        placeholderTextColor="grey"
      />

      {/* Botão Cadastrar */}
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Cadastrando...' : 'Cadastrar'}</Text>
      </TouchableOpacity>

      {/* Link para login */}
      <TouchableOpacity onPress={() => router.push('/LoginPage')}>
      <Text style={styles.login}>
        Já possui uma conta? <Text style={styles.link}>Entre</Text>
      </Text>
      </TouchableOpacity>
    </View>
  )
}
