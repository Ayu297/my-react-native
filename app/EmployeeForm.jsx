import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function EmployeeForm({ employee, onSave }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    hireDate: '',
    position: '',
    salary: '',
    image: null,
  });

  useEffect(() => {
    if (employee) {
      const formattedHireDate = employee.hireDate
        ? new Date(employee.hireDate).toISOString().slice(0, 10)
        : '';
      setFormData({
        fullName: employee.fullName,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        hireDate: formattedHireDate,
        position: employee.position,
        salary: employee.salary,
        image: null,
      });
    } else {
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        hireDate: '',
        position: '',
        salary: '',
        image: null,
      });
    }
  }, [employee]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, image: result.uri });
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    const employeeDetails = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      hireDate: formData.hireDate,
      position: formData.position,
      salary: formData.salary,
    };

    if (employee && employee.id) {
      employeeDetails.id = employee.id;
    }

    const jsonEmployee = JSON.stringify(employeeDetails);
    data.append('employee', new Blob([jsonEmployee], { type: 'application/json' }));

    if (formData.image) {
      let localUri = formData.image;
      let filename = localUri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      data.append('image', { uri: localUri, name: filename, type });
    }

    try {
      await onSave(data, employee ? employee.id : null);
    } catch (e) {
      console.error('Error submitting form:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={formData.fullName}
        onChangeText={(value) => handleChange('fullName', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChangeText={(value) => handleChange('phoneNumber', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Hire Date"
        value={formData.hireDate}
        onChangeText={(value) => handleChange('hireDate', value)}
      />
      <RNPickerSelect
        onValueChange={(value) => handleChange('position', value)}
        items={[
          { label: 'Select Position', value: '' },
          { label: 'Cashier', value: 'CASHIER' },
          { label: 'Manager', value: 'MANAGER' },
        ]}
        style={{
          inputIOS: styles.input,
          inputAndroid: styles.input,
        }}
        value={formData.position}
      />
      <TextInput
        style={styles.input}
        placeholder="Salary"
        keyboardType="numeric"
        value={formData.salary}
        onChangeText={(value) => handleChange('salary', value)}
      />
      <Button title="Pick an image from gallery" onPress={pickImage} />
      {formData.image && <Image source={{ uri: formData.image }} style={styles.image} />}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});
