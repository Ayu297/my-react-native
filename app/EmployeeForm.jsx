import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import COLORS from '../constants/colors';
import { createEmployee } from '../redux/features/employeeSlice';

const EmployeeForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(createEmployee({ fullName, email, phoneNumber, position, salary }));
        setFullName('');
        setEmail('');
        setPhoneNumber('');
        setPosition('');
        setSalary('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <Picker
                selectedValue={position}
                style={styles.picker}
                onValueChange={(itemValue) => setPosition(itemValue)}
            >
                <Picker.Item label="Select Position" value="" />
                <Picker.Item label="Cashier" value="CASHIER" />
                <Picker.Item label="Manager" value="MANAGER" />
            </Picker>
            <TextInput
                style={styles.input}
                placeholder="Salary"
                value={salary}
                keyboardType="numeric"
                onChangeText={setSalary}
            />
            <Button title="Add Employee" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginTop: 50
    },
    input: {
        height: 40,
        borderColor: COLORS.black,
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    picker: {
        height: 50,
        borderColor: COLORS.black,
        borderWidth: 1,
        marginBottom: 12,
    },
});

export default EmployeeForm;
