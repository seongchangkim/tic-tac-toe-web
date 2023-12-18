export interface CallGetApiParameterType {
    path: string;
    queryParameter: string | undefined;
    token: string;
}

export interface CallPostApiParameterType {
    path: string;
    body: any;
    token: string | undefined;
}
