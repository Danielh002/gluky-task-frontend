export interface Roles {
    NO_AUTH : "NO_AUTH",
    EDITOR : "EDITOR",
    WRITER :"WRITER"
}

export interface User {
    _id?: string,
    name: string,
    email: string,
    role?: Roles,
    imageUrl?: string,
    idToken?: string,
}