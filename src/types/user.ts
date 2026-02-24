export type User = {
    id   ?: number;
    username  : string;
}

export type UserCredentials = {
    username : string;
    password : string;
    token   ?: string;
}