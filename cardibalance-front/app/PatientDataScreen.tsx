import React from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import styles from './styles/PatientDataScreen.styles'

export default function FeaturesScreen() {
  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Características</Text>

      {/* Inputs peso e altura */}
      <TextInput
        placeholder="Peso (Kg)"
        style={styles.input}
        placeholderTextColor="grey"
      />
      <TextInput
        placeholder="Altura (m)"
        style={styles.input}
        placeholderTextColor="grey"
      />

    {/* opções de Genero */}
    <View style={styles.gender}> 
     <TouchableOpacity style={styles.primaryGenderButton}>
        <Text style={styles.primaryGenderButtonText}>Sexo Masculino</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secundaryGenderButton}>
        <Text style={styles.secundaryGenderButtonText}>Sexo Feminino</Text>
      </TouchableOpacity>

      </View>

      {/* Data de Nascimento */}

      <View style={styles.date}>
        <Text style={styles.dateTitle}>Data de Nascimento:</Text>

      </View>

      {/* Botão de Confirmar */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    
    </View>
  )
}
