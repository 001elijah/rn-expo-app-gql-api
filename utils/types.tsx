import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
    LoginScreen: undefined;
    RegistrationScreen: undefined;
    Auth: undefined;
    HomeScreen: {token: string, refreshToken: string | null};
};


export type LoginScreenProps = StackScreenProps<RootStackParamList, 'LoginScreen'>;
export type RegistrationScreenProps = StackScreenProps<RootStackParamList, 'RegistrationScreen'>;
export type AuthProps = StackScreenProps<RootStackParamList, 'Auth'>;
export type HomeScreenProps = StackScreenProps<RootStackParamList, 'HomeScreen'>;

export type LoginScreenNavigationProp = LoginScreenProps['navigation'];
export type RegistrationScreenNavigationProp = RegistrationScreenProps['navigation'];
export type AuthNavigationProp = AuthProps['navigation'];
export type HomeScreenNavigationProp = HomeScreenProps['navigation'];