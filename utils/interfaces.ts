export interface UserDataInterface {
    me: {
        __typename: string;
        createdAt: string;
        email: string;
        id: string;
        profile: {
            __typename: string;
            fullName: string;
        }
    };
    prevState: null
}