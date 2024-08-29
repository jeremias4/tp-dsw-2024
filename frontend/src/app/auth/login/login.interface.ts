export interface Login {
    emailAdress: string,
    password: string
}


export interface ResponseLogin {
    inSuccess: boolean,
    token: string
}