export type HomeScreenUseRouteParamList = Readonly<{
    key: string;
    name: string;
    path?: string | undefined;
    params: { token?: string, refreshToken?: string }
}>