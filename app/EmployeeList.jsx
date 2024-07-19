import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, fetchEmployees, updateEmployee } from '../redux/features/employeeSlice';

export default function EmployeeList() {
  const { employees } = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    salary: '',
    status: true,
  });

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Employee',
      'Are you sure you want to delete this employee?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => {
            dispatch(deleteEmployee(id))
              .unwrap()
              .then(() => {
                dispatch(fetchEmployees());
              })
              .catch((error) => console.error('Deletion failed:', error));
          }
        }
      ]
    );
  };

  const handleEdit = (item) => {
    setEditingEmployee(item);
    setFormData({
      fullName: item.fullName,
      email: item.email,
      phoneNumber: item.phoneNumber,
      position: item.position,
      salary: item.salary,
      status: item.status,
    });
  };

  const handleUpdate = () => {
    if (editingEmployee) {
      dispatch(updateEmployee({ ...editingEmployee, ...formData }))
        .unwrap()
        .then(() => {
          setEditingEmployee(null);
          setFormData({
            fullName: '',
            email: '',
            phoneNumber: '',
            position: '',
            salary: '',
            status: true,
          });
          dispatch(fetchEmployees());
        })
        .catch((error) => console.error('Update failed:', error));
    }
  };

  const renderEmployee = ({ item }) => (
    <View style={styles.employee}>
      <Text style={styles.employeeText}>Full Name: {item.fullName}</Text>
      <Text style={styles.employeeText}>Email: {item.email}</Text>
      <Text style={styles.employeeText}>Phone Number: {item.phoneNumber}</Text>
      <Text style={styles.employeeText}>Position: {item.position}</Text>
      <Text style={styles.employeeText}>Salary: {item.salary}</Text>
      <Text style={styles.employeeText}>Status: {item.status ? 'Active' : 'Inactive'}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]} 
          onPress={() => handleEdit(item)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]} 
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {editingEmployee && (
        <View style={styles.editForm}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={formData.fullName}
            onChangeText={(text) => setFormData({...formData, fullName: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChangeText={(text) => setFormData({...formData, phoneNumber: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Position"
            value={formData.position}
            onChangeText={(text) => setFormData({...formData, position: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Salary"
            value={formData.salary}
            keyboardType="numeric"
            onChangeText={(text) => setFormData({...formData, salary: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Status (true/false)"
            value={formData.status.toString()}
            onChangeText={(text) => setFormData({...formData, status: text === 'true'})}
          />
          <TouchableOpacity 
            style={[styles.button, styles.updateButton]} 
            onPress={handleUpdate}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      )}
      {employees.length === 0 ? (
        <Text style={styles.noEmployeesText}>No employees found</Text>
      ) : (
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderEmployee}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    padding: 20,
  },
  employee: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  employeeText: {
    fontSize: 16,
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#1E90FF',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
  },
  updateButton: {
    backgroundColor: '#32CD32',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  noEmployeesText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  editForm: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
