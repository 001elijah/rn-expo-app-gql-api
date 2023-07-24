# rn-expo-app-gql-api

## how to start the App
run ```npm start```

open camera and scan the QR code

### Server is available at [https://uplab-test-auth-backend-3211cfc38d0c.herokuapp.com/graphql](https://uplab-test-auth-backend-3211cfc38d0c.herokuapp.com/graphql)

You can use a GraphQL sandbox to write queries and test your requests: [https://studio.apollographql.com/sandbox/explorer?endpoint=https://uplab-test-auth-backend-3211cfc38d0c.herokuapp.com/graphql](https://studio.apollographql.com/sandbox/explorer?endpoint=https://uplab-test-auth-backend-3211cfc38d0c.herokuapp.com/graphql)

Here are some example queries and mutations that would be useful:

#### Create user

```
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
```

##### Variables:

```
{
  "input": {
    "email": "ihor@uplab.io",
    "fullName": "Ihor",
    "password": "1"
  }
}
```

###### Example response:

```
{
  "data": {
    "createUser": {
      "createdAt": "2023-07-17T09:11:59.974Z",
      "id": "64b505df8e5e4d7f296ece10",
      "email": "ihor@uplab.io",
      "profile": {
        "fullName": "Ihor",
        "phoneNumber": null
      }
    }
  }
}
```

#### Login

```
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
```

##### Variables:

```
{
  "rememberMe": true,
  "password": "1",
  "email": "ihor@uplab.io"
}
```

###### Example response:

```
{
  "data": {
    "login": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGI1MDVkZjhlNWU0ZDdmMjk2ZWNlMTAiLCJlbWFpbCI6Imlob3JAdXBsYWIuaW8iLCJzZXNzaW9uSWQiOiI2NGI1MGVhNTcxYjY3ZjYxNTZhYmM5ODMiLCJpYXQiOjE2ODk1ODczNjUsImV4cCI6MTY4OTU4NzM4MH0.m09y9nMfDMYvACK9g723buDtHgRujEwLiSJ02cHdNWk",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGI1MDVkZjhlNWU0ZDdmMjk2ZWNlMTAiLCJlbWFpbCI6Imlob3JAdXBsYWIuaW8iLCJzZXNzaW9uSWQiOiI2NGI1MGVhNTcxYjY3ZjYxNTZhYmM5ODMiLCJpYXQiOjE2ODk1ODczNjUsImV4cCI6MTY5MDE5MjE2NX0.ezU0YGnfVe2P0kpb7DeCOw72P5eSWJb87SWhbhn4wqQ",
      "user": {
        "id": "64b505df8e5e4d7f296ece10",
        "email": "ihor@uplab.io",
        "profile": {
          "fullName": "Ihor Barmak"
        },
        "createdAt": "2023-07-17T09:11:59.974Z"
      }
    }
  }
}
```

#### Me

```
query Me {
  me {
    id
    profile {
      fullName
    }
    createdAt
    email
  }
}
```

##### Headers:

```
{
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGI1MDVkZjhlNWU0ZDdmMjk2ZWNlMTAiLCJlbWFpbCI6Imlob3JAdXBsYWIuaW8iLCJzZXNzaW9uSWQiOiI2NGI1MGVhNTcxYjY3ZjYxNTZhYmM5ODMiLCJpYXQiOjE2ODk1ODczNjUsImV4cCI6MTY4OTU4NzM4MH0.m09y9nMfDMYvACK9g723buDtHgRujEwLiSJ02cHdNWk"
}
```

###### Example response:

```
{
  "data": {
    "me": {
      "id": "64b505df8e5e4d7f296ece10",
      "profile": {
        "fullName": "Ihor"
      },
      "createdAt": "2023-07-17T09:11:59.974Z",
      "email": "ihor@uplab.io"
    }
  }
}
```

#### UpdateProfile

```
mutation UpdateProfile($input: EditUserInfoInput!) {
  updateProfile(input: $input) {
    id
    profile {
      fullName
    }
    email
    createdAt
  }
}
```

##### Variables:

```
{
  "input": {
    "fullName": "Ihor Barmak"
  }
}
```

##### Headers:

```
{
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGI1MDVkZjhlNWU0ZDdmMjk2ZWNlMTAiLCJlbWFpbCI6Imlob3JAdXBsYWIuaW8iLCJzZXNzaW9uSWQiOiI2NGI1MGVhNTcxYjY3ZjYxNTZhYmM5ODMiLCJpYXQiOjE2ODk1ODczNjUsImV4cCI6MTY4OTU4NzM4MH0.m09y9nMfDMYvACK9g723buDtHgRujEwLiSJ02cHdNWk"
}
```

###### Example response:

```
{
  "data": {
    "updateProfile": {
      "id": "64b505df8e5e4d7f296ece10",
      "profile": {
        "fullName": "Ihor Barmak"
      },
      "email": "ihor@uplab.io",
      "createdAt": "2023-07-17T09:11:59.974Z"
    }
  }
}
```

### Exchange refresh token and get new access token

```
mutation Token($refreshToken: String!) {
  token(refreshToken: $refreshToken) {
    accessToken
    refreshToken
  }
}
```

##### Variables:

```
{
  "input": {
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGI1MDVkZjhlNWU0ZDdmMjk2ZWNlMTAiLCJlbWFpbCI6Imlob3JAdXBsYWIuaW8iLCJzZXNzaW9uSWQiOiI2NGI1MGVhNTcxYjY3ZjYxNTZhYmM5ODMiLCJpYXQiOjE2ODk1ODczNjUsImV4cCI6MTY5MDE5MjE2NX0.ezU0YGnfVe2P0kpb7DeCOw72P5eSWJb87SWhbhn4wqQ"
  }
}
```

###### Example Response:

```
{
  "data": {
    "token": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGI1MDVkZjhlNWU0ZDdmMjk2ZWNlMTAiLCJlbWFpbCI6Imlob3JAdXBsYWIuaW8iLCJzZXNzaW9uSWQiOiI2NGI1MGVhNTcxYjY3ZjYxNTZhYmM5ODMiLCJpYXQiOjE2ODk1ODc2NDMsImV4cCI6MTY4OTU4NzY1OH0.lVsxwYocAQCXBxjChZn_tuLWoUfl2qgqhuOeV7Z2Fg4"
    }
  }
}
```

## The application has the following features:

### User can create a new account

- Use the `createUser` mutation to register a new user.
- Display a form where the user can enter their email, full name, and password.
- Upon successful registration show a success message and display the login form.

### User can login into app:

- Use the `login` mutation to authenticate a user and obtain access and refresh tokens.
- Display a login form where the user can enter their email and password.
- Login form should have a "Remember me" checkbox - if it is false, then server will not return you the refresh token.
- Upon successful login, store the access and refresh tokens securely (https://docs.expo.dev/versions/latest/sdk/securestore/)
- Display the user's email, full name, and creation date.
- Get currently logged-in user information:

### User can view information about their profile

- Use the `me` query to fetch the currently logged-in user's information.
- Display the user's email, full name, and creation date.

### User can logout:

- Allow user to logout from the application. No GraphQL calls required for this

### User can update their full name:

- Use the `updateProfile` mutation to update the user's full name.
- Display a form where the user can enter their new full name.
- Upon successful update, display the updated user's email, full name, and creation date.


### Exchange refresh token for a new access token to make the user session longer:

- Use the token mutation to exchange the refresh token for a new access token.
- Handle token expiration gracefully by automatically refreshing the access token when needed.
- NOTE: You will not receive an access token if you pass `rememberMe: false` into `login` mutation.


### User should stay logged in if they reopen the application 

- Don't show registration/login screens if user is logged in and there is an access token.

## Requirements and Guidelines:

- Use React Native and Expo to build the application.
- Use React Navigation https://reactnavigation.org/
- Use Apollo Client to communicate with the GraphQL API. https://www.apollographql.com/docs/react/
- Use TypeScript.
- Don't spend too much time on styles - beautiful UI will be a plus only if the features are working well.
- Implement proper error handling and display appropriate error messages to the user.
- Implement navigation between screens using React Navigation.
- Store and manage the user's authentication tokens securely.
- Provide clear instructions on how to run the application and any additional setup required.
- Apollo authentication guide: https://www.apollographql.com/docs/react/networking/authentication/
- Default screen should be Login
- GraphQL docs: https://graphql.org/learn/

### Learn More

To learn more, take a look at the following resources:

-   [React Native](https://reactnative.dev/) - learn about React Native.
-   [Expo](https://docs.expo.dev/) - learn about Expo.
-   [React Navigation](https://reactnavigation.org/) - learn about React Navigation.
-   [Apollo client](https://www.apollographql.com/docs/react/) - learn about Apollo client.
-   [Apollo auth guide](https://www.apollographql.com/docs/react/networking/authentication/) - learn Apollo auth guide.
-   [GraphQL docs](https://graphql.org/learn/) - learn GraphQL docs.
