import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../app/components/Button';

const index = () => {
  const router = useRouter();
  return (
    <View style={{flex: 1, marginTop: 150}}>
      
      <Text>index</Text>
      <Button
        title='Tabs'
        onPress={() => router.push('(tabs)')}
      />
      <Button
        title='Login'
        onPress={() => router.push('/login')}
      />
      <View style={{flex: 1, marginTop: 150}}>
      <Text>index</Text>
      <Button
        title='Employee List'
        onPress={() => router.push('/EmployeeList')}
      />
      </View>

      <View style={{flex: 1, marginTop: 150}}>
      <Text>index</Text>
      <Button
        title='Employee Form'
        onPress={() => router.push('/EmployeeForm')}
      />
      </View>

    </View>
  )
}

export default index

const styles = StyleSheet.create({})
