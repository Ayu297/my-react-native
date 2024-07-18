import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { AuthProvider } from '../context/AuthContext'
import store from '../redux/store'

const RootLayout = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
      <Stack>
        <Stack.Screen name='index'  options={{ headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
        <Stack.Screen name="login"  options={{ headerShown: false}}/>
        <Stack.Screen name='signup'  options={{ headerShown: false}}/>
        <Stack.Screen name='EmployeeForm'  options={{ headerShown: false}}/>
        <Stack.Screen name='EmployeeList'  options={{ headerShown: false}}/>
        </Stack>
    </Provider>
    </AuthProvider>
    
    
  )
}

export default RootLayout

const styles = StyleSheet.create({})
