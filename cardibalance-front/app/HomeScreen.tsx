import axios from 'axios'
import { useFocusEffect, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import styles from './styles/HomeScreen.styles'

import { useAuth } from "./context/AuthContext"
// Import das funções de storage atualizadas
import { storageAuthTokenGet, storageUserGet } from '@/storage/storageAuthToken'

export default function HomeScreen() {
  const router = useRouter()
   const { logged, logout } = useAuth();

   function handleLogout() {
    logout();
    router.replace("./login");
  }
   
  
  // Estados
  const [userName, setUserName] = useState('Visitante')
  const [avgGlucose, setAvgGlucose] = useState('--')
  const [avgPressure, setAvgPressure] = useState('--/--')
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  // 1. Busca o Nome do Usuário do Storage
  const fetchUserData = async () => {
    try {
      const user = await storageUserGet();
      if (user && user.name) {
        // Pega o primeiro nome (ex: "Carlos" de "Carlos Silva")
        setUserName(user.name.split(' ')[0]);
      }
    } catch (error) {
      console.log('Erro ao carregar usuário', error);
    }
  }

  // 2. Busca dados da API e calcula médias
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = await storageAuthTokenGet();
      
      // Filtro: Últimos 30 dias
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 30); 

      // Parâmetros formatados para o Java (YYYY-MM-DD)
      const paramsCommon = {
        dataInicio: startDate.toISOString().split('T')[0],
        dataFim: endDate.toISOString().split('T')[0],
      };

      // Chamadas paralelas para Glicose e Pressão
      // ATENÇÃO: Troque 'localhost' pelo IP da sua máquina se estiver no Android (ex: 10.0.2.2 ou 192.168.x.x)
      const [responseGlicose, responseBP] = await Promise.all([
        axios.get('http://localhost:8080/medicoes', { 
          headers: { "Authorization": `Bearer ${token}` },
          params: { ...paramsCommon, tipo: 'GLICEMIA' }
        }),
        axios.get('http://localhost:8080/medicoes', { 
          headers: { "Authorization": `Bearer ${token}` },
          params: { ...paramsCommon, tipo: 'BP' }
        })
      ]);

      // Cálculo Média Glicose
      const listaGlicose = responseGlicose.data;
      if (listaGlicose.length > 0) {
        const total = listaGlicose.reduce((acc: number, item: any) => acc + item.valorNum, 0);
        setAvgGlucose(`${Math.round(total / listaGlicose.length)} mg/dL`);
      } else {
        setAvgGlucose('-- mg/dL');
      }

      // Cálculo Média Pressão
      const listaBP = responseBP.data;
      if (listaBP.length > 0) {
        const totalSis = listaBP.reduce((acc: number, item: any) => acc + item.valorNum, 0);
        const totalDia = listaBP.reduce((acc: number, item: any) => acc + (item.valorAux || 0), 0);
        setAvgPressure(`${Math.round(totalSis / listaBP.length)}/${Math.round(totalDia / listaBP.length)} mmHg`);
      } else {
        setAvgPressure('--/-- mmHg');
      }

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Atualiza ao entrar na tela
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
      fetchDashboardData();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }} 
          style={styles.avatar}
        />
        <View>
          <Text style={{fontSize: 16, color: '#666'}}>Olá,</Text>
          <Text style={styles.welcome}>{userName}</Text>
          
        </View>
        <View style={styles.loggof}>
        <TouchableOpacity 
        onPress={logout}
        style={styles.loggofButton}>
          <Image
  source={require('../assets/images/logout.png')}
  style={styles.image}
/>
        </TouchableOpacity>
         </View>
      </View>

      {/* Visão Geral */}
      <Text style={styles.sectionTitle}>Média (30 dias)</Text>
      
      {loading && !refreshing ? (
        <ActivityIndicator size="large" color="#007AFF" style={{marginVertical: 20}}/>
      ) : (
        <>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Glicose Média</Text>
            <Text style={styles.cardValue}>{avgGlucose}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Pressão Média</Text>
            <Text style={styles.cardValue}>{avgPressure}</Text>
          </View>
        </>
      )}

      {/* Ações */}
      <Text style={styles.sectionTitle}>Ações</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/HealthRegisterScreen')}
        >
          <Text style={styles.primaryButtonText}>Registrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push('/HistoryScreen')}
        >
          <Text style={styles.secondaryButtonText}>Relatórios</Text>
        </TouchableOpacity>
      </View>

      {/* Dicas (Mantido igual) */}
      <Text style={styles.sectionTitle}>Dicas</Text>
      <View style={styles.tipsContainer}>
         {/* ... Seus cards de dicas ... */}
         <TouchableOpacity style={[styles.tipCard, styles.nutritionCard]}>
            <Image
              source={{uri: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop'}}
              style={styles.cardImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tipCard, styles.exerciseCard]}>
            <View style={styles.exerciseContent}>
              <Text style={styles.exerciseText}>NUTRIÇÃO • NATURAL</Text>
            </View>
          </TouchableOpacity>
      </View>
      
      <View style={{height: 40}} />
    </ScrollView>
  )
}