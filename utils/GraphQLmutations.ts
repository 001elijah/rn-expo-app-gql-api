import { gql } from '@apollo/client';

export const UPDATE_CURRENT_USER_DATA = gql`
        mutation UpdateProfile($input: EditUserInfoInput!) {
            updateProfile(input: $input) {
                id
                profile {
                    fullName
                }
                email
                createdAt
            }
        }`;

export const REFRESH_USER_TOKEN = gql`
        mutation Token($refreshToken: String!) {
            token(refreshToken: $refreshToken) {
                accessToken
                refreshToken
            }
        }`;