import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Importar suas telas
import HomeScreen from '../HomeScreen'
import RegisterScreen from '../RegisterScreen'
import HistoryScreen from '../HistoryScreen'
// import DicasScreen from '../DicasScreen' // Crie essa tela se ainda não existir

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500'
        },
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Início"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Registrar"
        component={RegisterScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="heart-pulse"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Histórico"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Dicas"
        component={HomeScreen} // Substitua por DicasScreen quando criar
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="lightbulb-outline"
              size={size}
              color={color}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}
