import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../constants/colors';
import { deleteEmployee, fetchEmployees } from '../redux/features/employeeSlice';

export default function EmployeeList() {
  const { employees } = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id))
      .unwrap()
      .then(() => {
        dispatch(fetchEmployees());
      })
      .catch((error) => console.error('Deletion failed:', error));
  };

  const renderEmployee = ({ item }) => (
    <View style={styles.employee}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.employeeText}>{item.fullName}</Text>
      <Text style={styles.employeeText}>{item.email}</Text>
      <Text style={styles.employeeText}>{item.phoneNumber}</Text>
      <Text style={styles.employeeText}>{item.position}</Text>
      <Text style={styles.employeeText}>{item.salary}</Text>
      <Text style={styles.employeeText}>{item.status ? 'Active' : 'Inactive'}</Text>
      {/* <View style={styles.buttonContainer}>
        <Button
          title="Edit"
          color="#1E90FF"
          onPress={() => onEdit(item)}
        />
        <Button
          title="Delete"
          color="#FF0000"
          onPress={() => handleDelete(item.id)}
        />
      </View> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEmployee}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  employee: {
    backgroundColor: COLORS.white,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  employeeText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});


