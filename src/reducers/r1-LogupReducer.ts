import * as React from 'react'
import {Dispatch} from "redux";
import {logUpAPI} from "../api/LogupAPI";

const InitialState = {isLogUp: false}
type InitialStateType = typeof InitialState

export const LogUpReducer = (state: InitialStateType = InitialState, action: ActionType) => {
    switch (action.type){
        case "logUn/SET-IS-LOGGED-UP":
            return {...state, isLogUp: action.isLogUp}
        default:
            return state
    }
}

export const setIsLogUpInAC = (isLogUp: boolean) =>
    ({type: 'logUn/SET-IS-LOGGED-UP', isLogUp} as const)

// thunks
export const loginTC = (data: any) => (dispatch: Dispatch<ActionType>) => {
    logUpAPI.login(data)
        .then(res => {
                dispatch(setIsLogUpInAC(true))
        })
        .catch((error) => {
            {}
        })
}

type ActionType = ReturnType<typeof setIsLogUpInAC>