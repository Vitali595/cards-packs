import {instance} from "./a1-instance";

export const setPassAPI = {
    setPass(resetPasswordToken: string, password: string) {
        return instance.post<ResponseDataType>("auth/set-new-password", {resetPasswordToken, password})
    }
}

type ResponseDataType = {
    error: string
}