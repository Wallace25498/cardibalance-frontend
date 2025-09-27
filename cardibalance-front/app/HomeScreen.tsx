import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles/HomeScreen.styles'

// Tela inicial do aplicativo, todos os textos como placeholders por enquanto

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Cabeçalho com avatar e saudação */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }} // Avatar fake
          style={styles.avatar}
        />
        <Text style={styles.welcome}>Bem-vindo, Dr. Silva</Text>
      </View>

      {/* Seção Visão Geral */}
      <Text style={styles.sectionTitle}>Visão Geral</Text>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Glicose</Text>
        <Text style={styles.cardValue}>110 mg/dL</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Pressão</Text>
        <Text style={styles.cardValue}>120/80 mmHg</Text>
      </View>

      {/* Seção Ações */}
      <Text style={styles.sectionTitle}>Ações</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Registrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Relatórios</Text>
        </TouchableOpacity>
      </View>

      {/* Seção Dicas */}
      <Text style={styles.sectionTitle}>Dicas</Text>
      <View style={styles.container}>
        <View style={styles.tipsContainer}>
          {/* Card de Nutrição */}
          <TouchableOpacity style={[styles.tipCard, styles.nutritionCard]}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop'
              }}
              style={styles.cardImage}
            />
          </TouchableOpacity>

          {/* Card de Exercício */}
          <TouchableOpacity style={[styles.tipCard, styles.exerciseCard]}>
            <View style={styles.exerciseContent}>
              <Text style={styles.exerciseText}>NUTRIÇÃO • NATURAL</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
