import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Importar suas telas
import HomeScreen from './HomeScreen'
// import RegisterScreen from './RegisterScreen'
// import PatientDataScreen from './PatientDataScreen'
import HistoryScreen from './HistoryScreen'
import DicasScreen from './DicasScreen'
import HealthRegisterScreen from './HealthRegisterScreen'

const Tab = createBottomTabNavigator()

export default function Index() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          height: 65,
          paddingBottom: 5,
          paddingTop: 5
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginTop: 2,
          marginBottom: 0
        },
        tabBarIconStyle: {
          marginBottom: 0
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarAllowFontScaling: false
      }}
    >
      <Tab.Screen
        name="Início"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={24} color={color} />
          ),
          tabBarLabel: 'Início'
        }}
      />
      <Tab.Screen
        name="Registrar"
        component={HealthRegisterScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="heart-pulse"
              size={24}
              color={color}
            />
          ),
          tabBarLabel: 'Registrar'
        }}
      />
      <Tab.Screen
        name="Histórico"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" size={24} color={color} />
          ),
          tabBarLabel: 'Histórico'
        }}
      />
      <Tab.Screen
        name="Dicas"
        component={DicasScreen} // Temporário - substitua por DicasScreen depois
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="lightbulb-outline"
              size={24}
              color={color}
            />
          ),
          tabBarLabel: 'Dicas'
        }}
      />
    </Tab.Navigator>
  )
}
