import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import styles from './styles/HistoryScreen.styles'
import axios from 'axios'
import { storageAuthTokenGet } from '@/storage/storageAuthToken'
import { useFocusEffect } from "@react-navigation/native";

// Tipagem exata baseada no seu JSON
interface Medicao {
  medicaoId: string;
  valorNum: number;
  valorAux: number | null;
  horarioMedicao: string; // ISO String
  contexto: 'BP' | 'GLICEMIA';
  criadoEm: string;
  observacao: string;
}

export default function HistoryScreen() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'glicose' | 'pressao'>('glicose');

  // Estados para Gráficos
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartDataset1, setChartDataset1] = useState<number[]>([0]); // Glicose ou Sistólica
  const [chartDataset2, setChartDataset2] = useState<number[]>([0]); // Diastólica

  // Estado para Lista (Iniciando VAZIO para não mostrar dados de Julho/2024)
  const [recentReadings, setRecentReadings] = useState<any[]>([]);
  
  // Estado para o Card Principal
  const [cardDataState, setCardDataState] = useState({
    value: '--',
    percentage: '0%'
  });

  // Formatador de Data (Ex: 23 de novembro, 2025)
  const formatarDataLegivel = (isoDate: string) => {
    if (!isoDate) return '--';
    const date = new Date(isoDate);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  // Formatador de Hora (Ex: 15:00 h)
  const formatarHora = (isoDate: string) => {
    if (!isoDate) return '--:--';
    return new Date(isoDate).toLocaleTimeString("pt-BR", {
        hour: '2-digit',
        minute: '2-digit'
    }) + ' h';
  }

  const fetchHistoryData = async () => {
    setLoading(true);
    try {
      const token = await storageAuthTokenGet();
      
      // Filtros de Data (Últimos 7 dias)
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 6);

      const params = {
        dataInicio: startDate.toISOString().split('T')[0], 
        dataFim: endDate.toISOString().split('T')[0],
        tipo: activeTab === 'glicose' ? 'GLICEMIA' : 'BP'
      };

      // Nota: Ajuste o IP se necessário (localhost vs IP da máquina)
      const response = await axios.get('http://localhost:8080/medicoes', { 
        headers: { "Authorization": `Bearer ${token}` },
        params: params
      });

      const data: Medicao[] = response.data;

      // --- 1. Processamento para o Gráfico (Agrupado por Dia) ---
      const last7DaysMap = new Map<string, { count: number, sumVal1: number, sumVal2: number, label: string }>();
      const labels: string[] = [];

      // Inicializa os 7 dias com zero
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0]; // YYYY-MM-DD
        const weekDay = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
        
        labels.push(weekDay);
        last7DaysMap.set(key, { count: 0, sumVal1: 0, sumVal2: 0, label: weekDay });
      }

      setChartLabels(labels);

      // Preenche com os dados da API
      data.forEach(item => {
        const itemDate = item.horarioMedicao.split('T')[0];
        if (last7DaysMap.has(itemDate)) {
          const current = last7DaysMap.get(itemDate)!;
          // Ignora valores zerados ou espúrios se necessário (ex: valorNum < 10)
          if (item.valorNum > 10) { 
            current.count += 1;
            current.sumVal1 += item.valorNum;
            current.sumVal2 += (item.valorAux || 0);
          }
        }
      });

      // Gera arrays finais
      const data1: number[] = [];
      const data2: number[] = [];

      last7DaysMap.forEach((val) => {
        if (val.count > 0) {
          data1.push(Math.round(val.sumVal1 / val.count));
          data2.push(Math.round(val.sumVal2 / val.count));
        } else {
          data1.push(0); 
          data2.push(0);
        }
      });

      setChartDataset1(data1);
      setChartDataset2(data2);

      // --- 2. Processamento para a Lista (Ordenação Descendente) ---
      const sortedData = [...data].sort((a, b) => 
        new Date(b.horarioMedicao).getTime() - new Date(a.horarioMedicao).getTime()
      );

      const formattedList = sortedData.map(item => {
        let displayValue = '';
        if (activeTab === 'glicose') {
            displayValue = `${item.valorNum} mg/dL`;
        } else {
            // CORREÇÃO AQUI: Exibir Sistólica/Diastólica
            const diastolica = item.valorAux ? Math.round(item.valorAux) : 0;
            displayValue = `${Math.round(item.valorNum)}/${diastolica} mmHg`;
        }

        return {
            id: item.medicaoId,
            date: formatarDataLegivel(item.horarioMedicao), // Usa a data da medição
            time: formatarHora(item.horarioMedicao),
            value: displayValue
        };
      });

      setRecentReadings(formattedList);

      // --- 3. Atualizar Card Principal (Última medição) ---
      if (sortedData.length > 0) {
        const latest = formattedList[0]; // Já formatado
        setCardDataState({
            value: latest.value,
            percentage: '+0%' // Você pode implementar cálculo real aqui se quiser
        });
      } else {
          setCardDataState({ value: '--', percentage: '0%' });
      }

    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
      alert("Não foi possível carregar o histórico.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHistoryData();
    }, [activeTab])
  );

  const screenWidth = Dimensions.get('window').width - 40;

  // Renderização do Gráfico
  const renderChart = () => {
    if (chartLabels.length === 0) return <ActivityIndicator color="#007AFF" />;
    
    // Configuração comum
    const chartConfig = {
      backgroundColor: '#ffffff',
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(119, 119, 119, ${opacity})`,
      style: { borderRadius: 8 },
      propsForDots: { r: '4', strokeWidth: '2', stroke: '#007AFF', fill: '#007AFF' },
      propsForBackgroundLines: { strokeDasharray: '', stroke: '#e3e3e3', strokeWidth: 1 }
    };

    if (activeTab === 'glicose') {
      return (
        <LineChart
          data={{ labels: chartLabels, datasets: [{ data: chartDataset1 }] }}
          width={screenWidth - 32}
          height={150}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      );
    } else {
      return (
        <LineChart
          data={{
            labels: chartLabels,
            datasets: [
              {
                data: chartDataset1, // Sistólica
                color: (opacity = 1) => `rgba(255, 59, 48, ${opacity})`, 
                strokeWidth: 2
              },
              {
                data: chartDataset2, // Diastólica
                color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                strokeWidth: 2
              }
            ],
            legend: ['Sistólica', 'Diastólica']
          }}
          width={screenWidth - 32}
          height={150}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      );
    }
  };

  const getStaticCardData = () => {
    return activeTab === 'glicose' 
      ? { subtitle: 'Níveis de Glicose', period: 'Últimos 7 dias' }
      : { subtitle: 'Pressão Arterial', period: 'Últimos 7 dias' };
  }
  const staticData = getStaticCardData();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.headerTitle}>Histórico</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('glicose')}>
          <Text style={[styles.tab, activeTab === 'glicose' && styles.activeTab]}>Glicose</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('pressao')}>
          <Text style={[styles.tab, activeTab === 'pressao' && styles.activeTab]}>Pressão Arterial</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainCard}>
        <Text style={styles.cardSubtitle}>{staticData.subtitle}</Text>
        {loading && recentReadings.length === 0 ? (
            <ActivityIndicator color="#000" style={{ marginVertical: 10 }} />
        ) : (
            <>
                <Text style={styles.glucoseValue}>{cardDataState.value}</Text>
                <Text style={styles.periodText}>
                    {staticData.period} <Text style={styles.percentageText}>{cardDataState.percentage}</Text>
                </Text>
            </>
        )}
        <View style={styles.chartContainer}>{renderChart()}</View>
      </View>

      <Text style={styles.sectionTitle}>Leituras Recentes</Text>

      {/* Lista de Leituras */}
      {recentReadings.map(reading => (
        <View key={reading.id} style={styles.readingCard}>
          <View style={styles.readingInfo}>
            <Text style={styles.readingDate}>{reading.date}</Text>
            <Text style={styles.readingValue}>{reading.value}</Text>
          </View>
          <Text style={styles.readingTime}>{reading.time}</Text>
        </View>
      ))}
      
      <View style={styles.bottomSpacer} />
    </ScrollView>
  )
}