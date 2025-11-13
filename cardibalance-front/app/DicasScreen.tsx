import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function DicasScreen() {
  const tips = [
    {
      id: '1',
      icon: 'water',
      title: 'Hidratação',
      description: 'Beba pelo menos 2 litros de água por dia'
    },
    {
      id: '2',
      icon: 'walk',
      title: 'Exercícios',
      description: 'Pratique 30 minutos de atividade física diária'
    },
    {
      id: '3',
      icon: 'food-apple',
      title: 'Alimentação',
      description: 'Consuma mais frutas e vegetais frescos'
    },
    {
      id: '4',
      icon: 'sleep',
      title: 'Descanso',
      description: 'Durma de 7 a 8 horas por noite'
    }
  ]

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.headerTitle}>Dicas de Saúde</Text>
      <Text style={styles.subtitle}>
        Recomendações para manter seu coração saudável
      </Text>

      {tips.map(tip => (
        <View key={tip.id} style={styles.tipCard}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={tip.icon as any}
              size={32}
              color="#007AFF"
            />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipDescription}>{tip.description}</Text>
          </View>
        </View>
      ))}

      <View style={styles.bottomSpacer} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginTop: 20,
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  tipContent: {
    flex: 1,
    justifyContent: 'center'
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4
  },
  tipDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20
  },
  bottomSpacer: {
    height: 20
  }
})
