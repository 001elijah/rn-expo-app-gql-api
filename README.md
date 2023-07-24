# rn-expo-app-gql-api

## how to start the App
run ```npm start```

open camera and scan the QR code

### Server is available at [https://uplab-test-auth-backend-3211cfc38d0c.herokuapp.com/graphql](https://uplab-test-auth-backend-3211cfc38d0c.herokuapp.com/graphql)

You can use a GraphQL sandbox to write queries and test your requests: [https://studio.apollographql.com/sandbox/explorer?endpoint=https://uplab-test-auth-backend-3211cfc38d0c.herokuapp.com/graphql](https://studio.apollographql.com/sandbox/explorer?endpoint=https://uplab-test-auth-backend-3211cfc38d0c.herokuapp.com/graphql)

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

### Learn More

To learn more, take a look at the following resources:

-   [React Navigation](https://reactnavigation.org/) - learn about React Navigation.
-   [Apollo client](https://www.apollographql.com/docs/react/) - learn about Apollo client.
-   [Apollo auth guide](https://www.apollographql.com/docs/react/networking/authentication/) - learn Apollo auth guide.
-   [GraphQL docs](https://graphql.org/learn/) - learn GraphQL docs.
