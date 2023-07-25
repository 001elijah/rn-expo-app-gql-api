import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { getToken } from './utils/tokenOperations';
import { AuthProps, RootStackParamList } from './utils/types';

const httpLink = createHttpLink({
  uri: 'https://uplab-test-auth-backend-3211cfc38d0c.herokuapp.com/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken('accessToken');

  return {
    ...headers,
    headers: {
      Authorization: token ? token : null,
    },
  }
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const Stack = createStackNavigator<RootStackParamList>();

const Auth: React.FC<AuthProps> = () => {
  return (
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false, title: "Login screen"}}
        />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{headerShown: false, title: "Registration screen"}}
        />
      </Stack.Navigator>
  );
};

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Auth'>
          <Stack.Screen
            name='Auth'
            component={Auth}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}