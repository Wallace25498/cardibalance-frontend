import React from 'react'
import { View, Text, ScrollView, Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import styles from './styles/HistoryScreen.styles'

export default function HistoryScreen() {
  // Dados do gráfico
  const glucoseData = [115, 120, 118, 110, 105, 130, 115]
  const weekLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

  // Leituras recentes
  const recentReadings = [
    { id: '1', date: '20 de Julho, 2024', value: 110, time: '8:00 AM' },
    { id: '2', date: '19 de Julho, 2024', value: 125, time: '9:15 AM' }
  ]

  // Largura da tela com padding
  const screenWidth = Dimensions.get('window').width - 40

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Text style={styles.headerTitle}>Histórico</Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <Text style={[styles.tab, styles.activeTab]}>Glicose</Text>
        <Text style={styles.tab}>Pressão Arterial</Text>
      </View>

      {/* Card Principal */}
      <View style={styles.mainCard}>
        <Text style={styles.cardSubtitle}>Níveis de Glicose</Text>
        <Text style={styles.glucoseValue}>120 mg/dL</Text>
        <Text style={styles.periodText}>
          Últimos 7 dias <Text style={styles.percentageText}>+5%</Text>
        </Text>

        {/* Gráfico */}
        <View style={styles.chartContainer}>
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
        </View>
      </View>

      {/* Leituras Recentes */}
      <Text style={styles.sectionTitle}>Leituras Recentes</Text>

      {recentReadings.map(reading => (
        <View key={reading.id} style={styles.readingCard}>
          <View style={styles.readingInfo}>
            <Text style={styles.readingDate}>{reading.date}</Text>
            <Text style={styles.readingValue}>{reading.value} mg/dL</Text>
          </View>
          <Text style={styles.readingTime}>{reading.time}</Text>
        </View>
      ))}

      {/* Espaçamento inferior para navegação */}
      <View style={styles.bottomSpacer} />
    </ScrollView>
  )
}
