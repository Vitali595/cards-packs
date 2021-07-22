import {instance} from "./a1-instance";

export const logUpAPI = {
    login(data: LogUpType) {
        const promise = instance.post<ResponseType<{}>>('auth/register', data);
        return promise;
    }
}

export type LogUpType = {
    email: string,
    password: string,
}
export type ResponseType<D = {}> = {
    data: D,
    error?: string
}