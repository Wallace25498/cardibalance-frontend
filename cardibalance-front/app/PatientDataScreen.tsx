import React, { useState } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
  Pressable,
  Platform
} from 'react-native'
import styles from './styles/PatientDataScreen.styles'
import DateTimePicker from '@react-native-community/datetimepicker';


export default function FeaturesScreen() {
  {/*date timepicker */}
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const toggleDatePicker = () => {
    setShowPicker(!showPicker); }
  const [dateOfBirth, setDateOfBirth] = useState('');
  {/*Variavel de armazenamento de genero */}
  const [selectedGender, setSelectedGender] = useState('');

{/*funções para o date timepicker */}
  const onChange = (event: any, selectedDate?: Date) => {
    if (event.type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateOfBirth(currentDate.toLocaleDateString());
      }
    } else {
      toggleDatePicker();
    }
  };
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
        <TouchableOpacity
          style={[
            styles.secundaryGenderButton,
            selectedGender === "Masculino" && styles.primaryGenderButton
          ]}
          onPress={() => setSelectedGender("Masculino")}
        >
          <Text style={[selectedGender === "Masculino" && styles.primaryGenderButtonText]}
          >Sexo Masculino</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[
          styles.secundaryGenderButton,
          selectedGender === "Feminino" && styles.primaryGenderButton
        ]}
          onPress={() => setSelectedGender("Feminino")}>
          <Text style={[selectedGender === "Feminino" && styles.primaryGenderButtonText]}>Sexo Feminino</Text>
        </TouchableOpacity>

      </View>

      {/* Data de Nascimento */}

      <View style={styles.date}>
        <Text style={styles.dateTitle}>Data de Nascimento:</Text> 

        {!showPicker && (<Pressable onPress={toggleDatePicker}><TextInput
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          placeholder='dd/mm/aa'
          style={styles.inputdate}
          placeholderTextColor="grey"
          editable={false}
        /></Pressable>)}

        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
          />
        )}
      </View>

      {/* Botão de Confirmar */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>

    </View>
  )
}
