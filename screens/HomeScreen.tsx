import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {
    Button,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useMutation, useQuery } from '@apollo/client';
import { UserDataInterface } from '../utils/interfaces';
import { HomeScreenProps } from '../utils/types';
import { HomeScreenUseRouteParamList } from '../utils/paramlists';
import { GET_CURRENT_USER_DATA } from '../utils/GraphQLqueries';
import { REFRESH_USER_TOKEN, UPDATE_CURRENT_USER_DATA } from '../utils/GraphQLmutations';
import { keepToken } from '../utils/tokenOperations';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [user, setUser] = useState<UserDataInterface | null>(null);
    const [fullName, setFullName] = useState<string>('');
    const { params: { token, refreshToken } } = useRoute<HomeScreenUseRouteParamList>();

    const handleLogOut = async () => {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        setUser(null);
        navigation.replace("Auth");
    }

    const {
            data: currentUserData,
            loading: currentUserLoading,
            error: currentUserError = null
        } = useQuery(
            GET_CURRENT_USER_DATA,
            {
                context: {
                    headers: {
                        authorization: token,
                    },
                },
            }
    );

    const [updateUserProfile] = useMutation(
        UPDATE_CURRENT_USER_DATA,
        {
            context: {
                headers: {
                    authorization: token,
                },
            },
        }
    );
    
    const [refreshUserToken] = useMutation(
        REFRESH_USER_TOKEN,
        {
            context: {
                headers: {
                    authorization: token,
                },
            },
        }
    );

    useEffect(() => {
        if (currentUserData) setUser(currentUserData);
        if (currentUserError) {
            if (currentUserError?.message === 'Not authorized') {
                refreshToken && refreshAccessToken(refreshToken);
            } else {
                alert(currentUserError?.message);
                handleLogOut();
            }
        }
    }, [currentUserData, currentUserError])
    
    const handleUpdateUserProfileName = async (name: string) => {
        try {
            await updateUserProfile({ variables: { input: { fullName: name } } });
            setFullName('');
        } catch (error: any) {
            console.log('handleUpdateUserProfileName Error: =>', error.message)
            if (error?.message === 'Not authorized') {
                if (refreshToken !== 'null') {
                    refreshToken && await refreshAccessToken(refreshToken);
                    setTimeout(() => {
                        handleUpdateUserProfileName(name);
                    }, 0);
                }
                else {
                    handleLogOut();
                };
            }
        }
    }

    const refreshAccessToken = async (refreshTokenInstance: string ) => {
        if (refreshTokenInstance !== 'null') {
            try {
                const { data: {token} } = await refreshUserToken({ variables: { refreshToken: refreshTokenInstance } });
                await keepToken('accessToken', token.accessToken);
                if (token.refreshToken) {
                    await keepToken('refreshToken', token.refreshToken);
                }
                if (token.refreshToken === null) {
                    await keepToken('refreshToken', 'null');
                }
                navigation.replace("Auth");
            } catch (error) {
                console.log('refreshAccessToken Error: => ', error);
            }
        } else {
            alert('Please login again');
            handleLogOut();
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                <Text style={styles.header}>{currentUserLoading? 'Loading...' : 'Home'}</Text>
                {user && (
                    <View style={styles.profileCard}>
                        <Text>email: {user.me.email}</Text>
                        <Text>name: {user.me.profile.fullName}</Text>
                        <Text>creation date: {new Date(user.me.createdAt).toUTCString()}</Text>
                    </View>
                )}
                <View>
                    <TextInput style={styles.textInput} value={fullName} onChangeText={setFullName} placeholder="Type your name" blurOnSubmit={true}/>
                    <View style={styles.btnContainer}>
                        <Button title='edit user name' onPress={() => handleUpdateUserProfileName(fullName)} />
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <Button title='logout' onPress={handleLogOut} />
                </View>
            </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
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
    profileCard: {
        backgroundColor: '#fff',
        padding: 12,
    },
    btnContainer: {
        backgroundColor: 'white',
        marginTop: 12,
    },
    textInput: {
        height: 40,
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 36,
    },
});

export default HomeScreen;