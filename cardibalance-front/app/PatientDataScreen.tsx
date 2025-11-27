import { storageAuthTokenGet,storageUserGet } from '@/storage/storageAuthToken';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import styles from './styles/PatientDataScreen.styles';

export default function FeaturesScreen() {
   const [pesoKg, setPeso] = useState('')
    const [alturaCm, setAlturaCm] = useState('')
    const [tipoDiabetes, setDiabetes] = useState('')
    const [comorbidades, setComorbidades] = useState('')
    const [sexo, setSexo] = useState('')
    const [dataNascimento, setData] = useState('')


    const handleRegister = async () => {
       
    if (!pesoKg || !alturaCm || !tipoDiabetes || !comorbidades || !sexo || !dataNascimento) {
      alert('Preencha todos os campos!')
      return
    }
    try {
     
      // Converter data de DD/MM/YYYY para YYYY-MM-DD (se necessário)
      let dataFormatada = dataNascimento
      if (dataNascimento.includes('/')) {
        const [dia, mes, ano] = dataNascimento.split('/')
        dataFormatada = `${ano}-${mes}-${dia}`
      }

      const token = await storageAuthTokenGet();

      
      if (!token) {
        alert('Token não encontrado')
        return
      }
 
      const response = await axios.post('http://localhost:8080/paciente', {
        dataNascimento: dataFormatada,
        sexo,
        pesoKg: Number(pesoKg),
        alturaCm: Number(alturaCm),
        tipoDiabetes,
        comorbidades,
        metaGlicemiaMin: 70.0,
        metaGlicemiaMax: 140.0,
        metaSysbp: 120.0,
        metaDiabp: 80.0,
        zonaHoraria: "America/Sao_Paulo" 

      }, {headers: {'Authorization': `Bearer ${token}`}} );
  

      alert('Dados salvos com sucesso!')
      router.replace('/')

    } catch (error: any) {
      console.error('Erro ao cadastrar:', error.response?.data || error.message)
      alert('Erro ao cadastrar!')
     

    } 
  }


  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Características</Text>

      {/* Inputs peso e altura */}
      <TextInput
        placeholder="Peso (Kg)"
        style={styles.input}
        placeholderTextColor="grey"
        onChangeText={setPeso}
      />
      <TextInput
        placeholder="Altura (Cm)"
        style={styles.input}
        placeholderTextColor="grey"
        onChangeText={setAlturaCm}
      />
      <TextInput
        placeholder="Tipo de Diabetes"
        style={styles.input}
        placeholderTextColor="grey"
        onChangeText={setDiabetes}
      />

       <TextInput
        placeholder="Comorbidades"
        style={styles.input}
        placeholderTextColor="grey"
        onChangeText={setComorbidades}
      />


      {/* opções de Genero */}
      <View style={styles.gender}>
        <TouchableOpacity
          style={[
            styles.secundaryGenderButton,
            sexo === "Masculino" && styles.primaryGenderButton
          ]}
          onPress={() => setSexo("Masculino")}
        >
          <Text style={[sexo === "Masculino" && styles.primaryGenderButtonText]}
          >Sexo Masculino</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[
          styles.secundaryGenderButton,
          sexo === "Feminino" && styles.primaryGenderButton
        ]}
          onPress={() => setSexo("Feminino")}>
          <Text style={[sexo === "Feminino" && styles.primaryGenderButtonText]}>Sexo Feminino</Text>
        </TouchableOpacity>

      </View>

      {/* Data de Nascimento */}

      <View style={styles.date}>
        <Text style={styles.dateTitle}>Data de Nascimento:</Text>
          <MaskedTextInput
          mask="99/99/9999"
              placeholder="DD/MM/YYYY"
              style={[styles.input, { marginBottom: 8 }]}
              placeholderTextColor="grey"
              onChangeText={setData}
              value={dataNascimento}
            />


      </View>

      {/* Botão de Confirmar */}
      <TouchableOpacity style={styles.button}
        onPress={handleRegister}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>

    </View>
  )
}
