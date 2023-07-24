import { useMutation, gql } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, Text, TextInput, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import Checkbox from 'expo-checkbox';
import { LoginScreenProps } from '../utils/types';
import { getToken, keepToken } from '../utils/tokenOperations';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [hasToken, setHasToken] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginUser, { data, loading, error }] = useMutation(gql`
        mutation Login($rememberMe: Boolean!, $password: String!, $email: String!) {
            login(rememberMe: $rememberMe, password: $password, email: $email) {
                accessToken
                refreshToken
                user {
                id
                email
                profile {
                    fullName
                }
                createdAt
                }
            }
            }
    `)

    useEffect(() => {
        (async () => {
        const token = await getToken('accessToken');
        const refreshToken = await getToken('refreshToken');
            if (token) {
                setHasToken(true);
                navigation.replace("HomeScreen", { token, refreshToken });
            }
        })();
    }, [hasToken])

    const handleLogintSubmit = async () => {
        Keyboard.dismiss();
        try {
            const { data: { login } } = await loginUser({ variables: { rememberMe, email, password } });
            await keepToken('accessToken', login.accessToken);
            if (login.refreshToken) {
    
                await keepToken('refreshToken', login.refreshToken);
            }
            if (login.refreshToken === null) {
    
                await keepToken('refreshToken', 'null');
            }
            navigation.replace("HomeScreen", { token: login.accessToken, refreshToken: login.refreshToken });
        } catch (error: any) {
            console.log('handleLogintSubmit error => :', error.message)
        }

    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text style={styles.header}>{loading ? 'Loading...' : 'Login'}</Text>
                    {/* { currentUserCredentials && <Text>{[currentUserCredentials.userEmail, currentUserCredentials.userFullName, currentUserCredentials.profileCreationDate]}</Text>} */}
                    <TextInput style={styles.textInput} value={email} onChangeText={setEmail} placeholder="Type your email"/>
                    <TextInput style={styles.textInput} value={password} onChangeText={setPassword} placeholder="Type your password" />
                    <View style={styles.checkboxWrapper}>
                        <Text>Remember me</Text>
                        <Checkbox
                            style={styles.checkbox}
                            value={rememberMe}
                            onValueChange={() => setRememberMe(!rememberMe)}
                            color={rememberMe ? '#0866f3' : undefined}
                        />
                    </View>
                    <View style={styles.btnContainer}>
                        <Button title='login' onPress={handleLogintSubmit} />
                    </View>
                    <View style={styles.btnContainer}>
                        <Button title='go to register' onPress={() => navigation.navigate('RegistrationScreen')} />
                    </View>
                    {error && <Text style={styles.errorText}>{error?.message === 'INCORRECT_CREDENTIALS' ? 'wrong email or password': error?.message}</Text>}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: 'space-around',
    },
    header: {
        fontSize: 36,
        marginBottom: 48,
    },
    textInput: {
        height: 40,
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 36,
    },
    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        margin: 8,
    },
    btnContainer: {
        backgroundColor: 'white',
        marginTop: 12,
    },
    errorText: {
        color: 'red',
    }
});

export default LoginScreen;