import {instance} from "./a1-instance";

export const forgotAPI = {
    forgot(email: string) {
        return instance.post<ResponseDataType>("auth/forgot", {
            email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: `<div style="background-color: lime; padding: 15px">password recovery link: 
                      <a href='https://DashaPodobed.github.io/friday#/set_new_password/$token$'>link</a></div>`
        })
    }
}

type ResponseDataType = {
    error: string
}