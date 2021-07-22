import {instance} from "./a1-instance";

export const authAPI = {
    login(data: loginParamsType) {
        return instance.post<ResponseType>('auth/login', data)
    },
    me() {
        return instance.post<ResponseType>('auth/me' )
    },
    logout() {
        return instance.delete<ResponseType>('auth/me')
    },

}

export type ResponseType = {
    _id: string,
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number,
    create: number,
    update: number,
    isAdmin: boolean,
    verified: boolean,
    rememberMe: boolean,
    error?: string
}
export type loginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean
}