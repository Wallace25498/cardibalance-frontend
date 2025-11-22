import React, { useState,useCallback } from 'react'
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import styles from './styles/HistoryScreen.styles'
import axios from 'axios'
import { AUTH_TOKEN_STORAGE } from '@/storage/storageConfigs'
import { storageAuthTokenGet } from '@/storage/storageAuthToken'
import { useFocusEffect } from "@react-navigation/native";


export default function HistoryScreen() {

//função para formatar a data das medições
  const formatarData = (data1: string) =>{
  const dataFormatada = new Date(data1).toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});
const partes = dataFormatada.split(" de ");

const dia = partes[0];      
const mes = partes[1];      
const ano = partes[2];      

const resultadoFinal = `${dia} de ${mes}, ${ano}`;

return resultadoFinal
  }
 

  const [activeTab, setActiveTab] = useState<'glicose' | 'pressao'>('glicose')

  // Dados do gráfico de Glicose
  const glucoseData = [115, 120, 118, 110, 105, 130, 115]
  const weekLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

  // Dados do gráfico de Pressão Arterial (Sistólica)
  const pressaoSistolicaData = [118, 122, 120, 115, 125, 128, 120]

  // Dados do gráfico de Pressão Arterial (Diastólica)
  const pressaoDiastolicaData = [75, 78, 76, 72, 80, 82, 78]

  // Leituras recentes de Glicose
  const [glucoseReadings,setGlucoseReadings] = useState  (  [
    { id: '1', date: '20 de Julho, 2024', value: '110 mg/dL', time: '8:00 AM' },
    { id: '2', date: '19 de Julho, 2024', value: '125 mg/dL', time: '9:15 AM' }
  ])

  // Leituras recentes de Pressão Arterial
  const [pressaoReadings, setPressaoReadings] = useState([
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
  ])

  //get para puxar os dados das ultimas medições de glicose 

   const atualizarHistoricoGlicose = async () => {
  try {
        const token = await storageAuthTokenGet();
        const dados= await axios.get('http://localhost:8080/medicoes?tipo=GLICEMIA&dataInicio=2020-01-01', { headers:{ "Authorization" : `Bearer ${token}` } })
        const listaMedicoes= dados.data;
        const ultimo = listaMedicoes[listaMedicoes.length - 1];
        const penultimo = listaMedicoes[listaMedicoes.length - 2];
        const horarioUltimo = ultimo.horarioMedicao.split("T")[1].substring(0,5);
        const dataFormatadaUltimo = formatarData(ultimo.criadoEm);
        const horarioPenultimo = penultimo.horarioMedicao.split("T")[1].substring(0,5);
        const dataFormatadaPenultimo = formatarData(penultimo.criadoEm);
  

        const leiturasRecentes = [
    {
      id: '1',
      date: dataFormatadaUltimo,
      value: ` ${ultimo.valorNum} mg/dL`,
      time: ` ${horarioUltimo} h` 
  
    },
    {
      id: '2',
      date: dataFormatadaPenultimo,
      value: ` ${penultimo.valorNum} mg/dL`,
      time: ` ${horarioPenultimo} h` 
    }
  ]
      setGlucoseReadings(leiturasRecentes);

        //dados exibidos no console para conferência
          console.log(JSON.stringify(dados,null,10));
      
      } catch (error: any) {
        
        // Mostrar o token como string. Ajuste a mensagem conforme necessário.
        alert("Erro ao pegar dados")
        console.error(error)
  
      }
    }

  //get para puxar os dados das ultimas medições de pressão arterial
     const atualizarHistoricoPressao = async () => {
  try {
        const token = await storageAuthTokenGet();
        const dados= await axios.get('http://localhost:8080/medicoes?tipo=BP&dataInicio=2020-01-01', { headers:{ "Authorization" : `Bearer ${token}` } })
        const listaMedicoes= dados.data;
        const ultimo = listaMedicoes[listaMedicoes.length - 1];
        const penultimo = listaMedicoes[listaMedicoes.length - 2];
        const horarioUltimo = ultimo.horarioMedicao.split("T")[1].substring(0,5);
        const dataFormatadaUltimo = formatarData(ultimo.criadoEm);
        const horarioPenultimo = penultimo.horarioMedicao.split("T")[1].substring(0,5);
        const dataFormatadaPenultimo = formatarData(penultimo.criadoEm);
  

        const leiturasRecentes = [
    {
      id: '1',
      date: dataFormatadaUltimo,
      value: ` ${ultimo.valorNum} mmHg`,
      time: ` ${horarioUltimo} h` 
  
    },
    {
      id: '2',
      date: dataFormatadaPenultimo,
      value: ` ${penultimo.valorNum} mmHg`,
      time: ` ${horarioPenultimo} h` 
    }
  ]
      setPressaoReadings(leiturasRecentes);

        // const primeiro= dados.data[0];
          console.log(JSON.stringify(dados,null,10));
      
      } catch (error: any) {
        
        // Mostrar o token como string. Ajuste a mensagem conforme necessário.
        alert("Erro ao pegar dados")
        console.error(error)
  
      }
    }

  //função para atualizar as leituras recentes  
  useFocusEffect(
  useCallback(() => {
    atualizarHistoricoGlicose(); // roda toda vez que a tela fica visível
    atualizarHistoricoPressao(); // roda toda vez que a tela fica visível
  }, [])
);

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
