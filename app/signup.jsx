import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import React, { useState } from 'react';
import { Button, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";


const signup = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        Create Account
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        Connect with your friend today!
                    </Text>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Email address</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={styles.input}
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Mobile Number</Text>
                    <View style={styles.inputBoxRow}>
                        <TextInput
                            placeholder='+91'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={styles.countryCodeInput}
                        />
                        <TextInput
                            placeholder='Enter your phone number'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={styles.phoneNumberInput}
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            style={styles.input}
                        />
                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={styles.iconButton}
                        >
                            <Ionicons name={isPasswordShown ? "eye-off" : "eye"} size={24} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.checkboxContainer}>
                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />
                    <Text>I agree to the terms and conditions</Text>
                </View>

                <Button
                    title="Sign Up"
                    filled
                    style={styles.signUpButton}
                />

                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>Or Sign up with</Text>
                    <View style={styles.divider} />
                </View>

                <View style={styles.socialMediaContainer}>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={styles.socialButton}
                    >
                        <Image
                            source={require("../assets/facebook.png")}
                            style={styles.socialIcon}
                            resizeMode='contain'
                        />
                        <Text>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={styles.socialButton}
                    >
                        <Image
                            source={require("../assets/google.png")}
                            style={styles.socialIcon}
                            resizeMode='contain'
                        />
                        <Text>Google</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={styles.loginText}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: COLORS.white,
    },
    container: {
        marginHorizontal: 22,
    },
    header: {
        marginVertical: 22,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 12,
        color: COLORS.black,
    },
    headerSubtitle: {
        fontSize: 16,
        color: COLORS.black,
    },
    inputGroup: {
        marginBottom: 12,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '400',
        marginVertical: 8,
    },
    inputBox: {
        width: "100%",
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 22,
    },
    inputBoxRow: {
        width: "100%",
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 22,
    },
    input: {
        width: "100%",
    },
    countryCodeInput: {
        width: "12%",
        borderRightWidth: 1,
        borderColor: COLORS.grey,
        height: "100%",
    },
    phoneNumberInput: {
        width: "80%",
    },
    iconButton: {
        position: "absolute",
        right: 12,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginVertical: 6,
    },
    checkbox: {
        marginRight: 8,
    },
    signUpButton: {
        marginTop: 18,
        marginBottom: 4,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.grey,
        marginHorizontal: 10,
    },
    dividerText: {
        fontSize: 14,
    },
    socialMediaContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    socialButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 52,
        borderWidth: 1,
        borderColor: COLORS.grey,
        marginRight: 4,
        borderRadius: 10,
    },
    socialIcon: {
        height: 36,
        width: 36,
        marginRight: 8,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 22,
    },
    footerText: {
        fontSize: 16,
        color: COLORS.black,
    },
    loginText: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: "bold",
        marginLeft: 6,
    }
});

export default signup;