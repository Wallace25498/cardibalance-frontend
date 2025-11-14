import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native'
import { ChevronLeft, Check } from 'lucide-react-native'
import { styles } from './styles/HealthRegisterScreen.styles'

interface GlicoseData {
  value: string
  fasting: boolean
  hour: string
  minute: string
}

interface PressaoData {
  sistolica: string
  diastolica: string
  hour: string
  minute: string
}

const HealthRegisterScreen: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState({
    glicose: false,
    pressao: false
  })

  const [glicoseData, setGlicoseData] = useState<GlicoseData>({
    value: '',
    fasting: true,
    hour: '',
    minute: ''
  })

  const [pressaoData, setPressaoData] = useState<PressaoData>({
    sistolica: '',
    diastolica: '',
    hour: '',
    minute: ''
  })

  const toggleItem = (item: 'glicose' | 'pressao') => {
    setSelectedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }))
  }

  const handleSave = () => {
    console.log('Salvando dados:', { glicoseData, pressaoData, selectedItems })
    // Adicione aqui sua lógica de salvamento
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registrar</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Glicose */}
        <TouchableOpacity
          style={styles.itemHeader}
          onPress={() => toggleItem('glicose')}
        >
          <Text style={styles.itemTitle}>Glicose</Text>
          <View
            style={[
              styles.checkbox,
              selectedItems.glicose && styles.checkboxSelected
            ]}
          >
            {selectedItems.glicose && <Check color="#fff" size={18} />}
          </View>
        </TouchableOpacity>

        {selectedItems.glicose && (
          <View style={styles.expandedSection}>
            <TextInput
              style={styles.input}
              placeholder="mg/dL"
              placeholderTextColor="#999"
              value={glicoseData.value}
              onChangeText={text =>
                setGlicoseData(prev => ({ ...prev, value: text }))
              }
              keyboardType="numeric"
            />

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  glicoseData.fasting && styles.optionButtonSelected
                ]}
                onPress={() =>
                  setGlicoseData(prev => ({ ...prev, fasting: true }))
                }
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    glicoseData.fasting && styles.optionButtonTextSelected
                  ]}
                >
                  Em Jejum
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  !glicoseData.fasting && styles.optionButtonSelected
                ]}
                onPress={() =>
                  setGlicoseData(prev => ({ ...prev, fasting: false }))
                }
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    !glicoseData.fasting && styles.optionButtonTextSelected
                  ]}
                >
                  Sem Jejum
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.timeRow}>
              <View style={styles.timeInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Hora"
                  placeholderTextColor="#999"
                  value={glicoseData.hour}
                  onChangeText={text =>
                    setGlicoseData(prev => ({ ...prev, hour: text }))
                  }
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>
              <View style={styles.timeInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Minutos"
                  placeholderTextColor="#999"
                  value={glicoseData.minute}
                  onChangeText={text =>
                    setGlicoseData(prev => ({ ...prev, minute: text }))
                  }
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>
            </View>
          </View>
        )}

        {/* Pressão Arterial */}
        <TouchableOpacity
          style={styles.itemHeader}
          onPress={() => toggleItem('pressao')}
        >
          <Text style={styles.itemTitle}>Pressão Arterial</Text>
          <View
            style={[
              styles.checkbox,
              selectedItems.pressao && styles.checkboxSelected
            ]}
          >
            {selectedItems.pressao && <Check color="#fff" size={18} />}
          </View>
        </TouchableOpacity>

        {selectedItems.pressao && (
          <View style={styles.expandedSection}>
            <TextInput
              style={styles.input}
              placeholder="Sistólica"
              placeholderTextColor="#999"
              value={pressaoData.sistolica}
              onChangeText={text =>
                setPressaoData(prev => ({ ...prev, sistolica: text }))
              }
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Diastólica"
              placeholderTextColor="#999"
              value={pressaoData.diastolica}
              onChangeText={text =>
                setPressaoData(prev => ({ ...prev, diastolica: text }))
              }
              keyboardType="numeric"
            />

            <View style={styles.timeRow}>
              <View style={styles.timeInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Hora"
                  placeholderTextColor="#999"
                  value={pressaoData.hour}
                  onChangeText={text =>
                    setPressaoData(prev => ({ ...prev, hour: text }))
                  }
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>
              <View style={styles.timeInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Minutos"
                  placeholderTextColor="#999"
                  value={pressaoData.minute}
                  onChangeText={text =>
                    setPressaoData(prev => ({ ...prev, minute: text }))
                  }
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>
            </View>
          </View>
        )}

        {/* Valores de Referência */}
        <View style={styles.referenceSection}>
          <Text style={styles.referenceTitle}>Valores de Referência</Text>
          <Text style={styles.referenceText}>
            Glicose (em jejum): 70-100 mg/dL
          </Text>
          <Text style={styles.referenceText}>
            Glicose (sem jejum): 70-140 mg/dL
          </Text>
          <Text style={styles.referenceText}>
            Pressão Arterial: 120/80 mmHg
          </Text>
        </View>

        {/* Botão Salvar */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default HealthRegisterScreen
