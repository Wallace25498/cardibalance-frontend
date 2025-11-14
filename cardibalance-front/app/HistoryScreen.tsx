import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import styles from './styles/HistoryScreen.styles'

export default function HistoryScreen() {
  const [activeTab, setActiveTab] = useState<'glicose' | 'pressao'>('glicose')

  // Dados do gráfico de Glicose
  const glucoseData = [115, 120, 118, 110, 105, 130, 115]
  const weekLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

  // Dados do gráfico de Pressão Arterial (Sistólica)
  const pressaoSistolicaData = [118, 122, 120, 115, 125, 128, 120]

  // Dados do gráfico de Pressão Arterial (Diastólica)
  const pressaoDiastolicaData = [75, 78, 76, 72, 80, 82, 78]

  // Leituras recentes de Glicose
  const glucoseReadings = [
    { id: '1', date: '20 de Julho, 2024', value: '110 mg/dL', time: '8:00 AM' },
    { id: '2', date: '19 de Julho, 2024', value: '125 mg/dL', time: '9:15 AM' }
  ]

  // Leituras recentes de Pressão Arterial
  const pressaoReadings = [
    {
      id: '1',
      date: '20 de Julho, 2024',
      value: '120/78 mmHg',
      time: '8:00 AM'
    },
    {
      id: '2',
      date: '19 de Julho, 2024',
      value: '125/80 mmHg',
      time: '9:15 AM'
    }
  ]

  // Largura da tela com padding
  const screenWidth = Dimensions.get('window').width - 40

  // Renderiza o gráfico baseado na aba ativa
  const renderChart = () => {
    if (activeTab === 'glicose') {
      return (
        <LineChart
          data={{
            labels: weekLabels,
            datasets: [
              {
                data: glucoseData
              }
            ]
          }}
          width={screenWidth - 32}
          height={150}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(119, 119, 119, ${opacity})`,
            style: {
              borderRadius: 8
            },
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: '#007AFF',
              fill: '#007AFF'
            },
            propsForBackgroundLines: {
              strokeDasharray: '',
              stroke: '#e3e3e3',
              strokeWidth: 1
            }
          }}
          bezier
          style={styles.chart}
          withInnerLines={true}
          withOuterLines={true}
          withVerticalLines={false}
          withHorizontalLines={true}
          withVerticalLabels={true}
          withHorizontalLabels={true}
          fromZero={false}
        />
      )
    } else {
      return (
        <LineChart
          data={{
            labels: weekLabels,
            datasets: [
              {
                data: pressaoSistolicaData,
                color: (opacity = 1) => `rgba(255, 59, 48, ${opacity})`, // Vermelho para sistólica
                strokeWidth: 2
              },
              {
                data: pressaoDiastolicaData,
                color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Azul para diastólica
                strokeWidth: 2
              }
            ],
            legend: ['Sistólica', 'Diastólica']
          }}
          width={screenWidth - 32}
          height={150}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(119, 119, 119, ${opacity})`,
            style: {
              borderRadius: 8
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2'
            },
            propsForBackgroundLines: {
              strokeDasharray: '',
              stroke: '#e3e3e3',
              strokeWidth: 1
            }
          }}
          bezier
          style={styles.chart}
          withInnerLines={true}
          withOuterLines={true}
          withVerticalLines={false}
          withHorizontalLines={true}
          withVerticalLabels={true}
          withHorizontalLabels={true}
          fromZero={false}
        />
      )
    }
  }

  // Dados do card principal baseado na aba ativa
  const getCardData = () => {
    if (activeTab === 'glicose') {
      return {
        subtitle: 'Níveis de Glicose',
        value: '120 mg/dL',
        period: 'Últimos 7 dias',
        percentage: '+5%'
      }
    } else {
      return {
        subtitle: 'Pressão Arterial',
        value: '120/78 mmHg',
        period: 'Últimos 7 dias',
        percentage: '+2%'
      }
    }
  }

  const cardData = getCardData()
  const readings = activeTab === 'glicose' ? glucoseReadings : pressaoReadings

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Text style={styles.headerTitle}>Histórico</Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('glicose')}>
          <Text
            style={[styles.tab, activeTab === 'glicose' && styles.activeTab]}
          >
            Glicose
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('pressao')}>
          <Text
            style={[styles.tab, activeTab === 'pressao' && styles.activeTab]}
          >
            Pressão Arterial
          </Text>
        </TouchableOpacity>
      </View>

      {/* Card Principal */}
      <View style={styles.mainCard}>
        <Text style={styles.cardSubtitle}>{cardData.subtitle}</Text>
        <Text style={styles.glucoseValue}>{cardData.value}</Text>
        <Text style={styles.periodText}>
          {cardData.period}{' '}
          <Text style={styles.percentageText}>{cardData.percentage}</Text>
        </Text>

        {/* Gráfico */}
        <View style={styles.chartContainer}>{renderChart()}</View>
      </View>

      {/* Leituras Recentes */}
      <Text style={styles.sectionTitle}>Leituras Recentes</Text>

      {readings.map(reading => (
        <View key={reading.id} style={styles.readingCard}>
          <View style={styles.readingInfo}>
            <Text style={styles.readingDate}>{reading.date}</Text>
            <Text style={styles.readingValue}>{reading.value}</Text>
          </View>
          <Text style={styles.readingTime}>{reading.time}</Text>
        </View>
      ))}

      {/* Espaçamento inferior para navegação */}
      <View style={styles.bottomSpacer} />
    </ScrollView>
  )
}
