import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const { login } = useAuth();  
    const router = useRouter();

    const handleLogin = () => {
        login(); 
        router.push('(tabs)');
    };
    
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        Hi Welcome Back! 👋
                    </Text>
                    <Text style={styles.subtitleText}>
                        Hello again, you have been missed!
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email address</Text>
                    <View style={styles.inputField}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={styles.textInput}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.inputField}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            style={styles.textInput}
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
                    <Text>Remember Me</Text>
                </View>

                <TouchableOpacity
                    onPress={handleLogin}
                    style={[styles.loginButton, { backgroundColor: COLORS.primary }]}
                >
                    <Text style={{ color: 'white' }}>Login</Text>
                </TouchableOpacity>

                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>Or Login with</Text>
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

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don't have an account?</Text>
                    <Pressable
                        onPress={() => router.push('(signup)')}
                    >
                        <Text style={styles.signupLink}>Register</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    container: {
        marginHorizontal: 22,
    },
    titleContainer: {
        marginVertical: 22,
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 12,
        color: COLORS.primary
    },
    subtitleText: {
        fontSize: 16,
        color: COLORS.primary
    },
    inputContainer: {
        marginBottom: 12
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '400',
        marginVertical: 8
    },
    inputField: {
        width: "100%",
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 22,
        position: "relative"
    },
    textInput: {
        width: "100%"
    },
    iconButton: {
        position: "absolute",
        right: 12
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginVertical: 6
    },
    checkbox: {
        marginRight: 8
    },
    loginButton: {
        marginTop: 18,
        marginBottom: 4,
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        borderRadius: 8
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.grey,
        marginHorizontal: 10
    },
    dividerText: {
        fontSize: 14
    },
    socialMediaContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
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
        borderRadius: 10
    },
    socialIcon: {
        height: 36,
        width: 36,
        marginRight: 8
    },
    signupContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 22
    },
    signupText: {
        fontSize: 16,
        color: COLORS.black
    },
    signupLink: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: "bold",
        marginLeft: 6
    }
});

export default Login;
