import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext';
import store from './redux/store';


const Stack = createStackNavigator();

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
           <Stack/>
        </SafeAreaView>
      </Provider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
