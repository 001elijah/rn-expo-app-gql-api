import { gql } from '@apollo/client';

export const GET_CURRENT_USER_DATA = gql`
        query Me {
            me {
                id
                profile {
                fullName
                }
                createdAt
                email
            }
        }`;