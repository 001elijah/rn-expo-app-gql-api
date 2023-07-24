import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { StyleSheet, Button, Text, TextInput, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

interface Props {
  navigation: any
}

const RegistrationScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [register, { data, loading, error }] = useMutation(gql`
        mutation CreateUser($input: CreateUserInput!) {
            createUser(input: $input) {
                createdAt
                id
                email
                profile {
                    fullName
                }
            }
        }
    `);

    const handleRegistrationSubmit = async () => {
        Keyboard.dismiss();
        await register({ variables: { input: { email, fullName, password } } });
        setTimeout(() => {
            navigation.replace('LoginScreen');
        }, 1000);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
            // keyboardVerticalOffset={height}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    {data
                        ? <Text style={styles.header}>Success! Redirecting to login page...</Text>
                        : <Text style={styles.header}>{loading ? 'Loading...' : 'Registration'}</Text>
                    }
                    <TextInput style={styles.textInput} value={email} onChangeText={setEmail} placeholder="Type your email" blurOnSubmit={true}/>
                    <TextInput style={styles.textInput} value={fullName} onChangeText={setFullName} placeholder="Type your name" blurOnSubmit={true}/>
                    <TextInput style={styles.textInput} value={password} onChangeText={setPassword} placeholder="Type your password" blurOnSubmit={true}/>
                    <View style={styles.btnContainer}>
                        <Button title='register' onPress={handleRegistrationSubmit} />
                    </View>
                    <View style={styles.btnContainer}>
                        <Button title='go to login' onPress={() => navigation.navigate('LoginScreen')} />
                    </View>
                    {error ? <Text>{error.message}</Text> : <Text>{JSON.stringify(data)}</Text>}
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
    btnContainer: {
        backgroundColor: 'white',
        marginTop: 12,
    },
});

export default RegistrationScreen;