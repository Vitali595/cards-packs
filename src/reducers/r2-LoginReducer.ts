import {Dispatch} from "redux";
import {authAPI, loginParamsType} from "../api/LoginAPI";
import {setPreloaderStatusAC} from "./r8-PreloaderReducer";
import {setErrorMessageAC} from "./r6-ErrorReducer";
import {ResponseType} from "../api/LoginAPI";

const InitialState: InitialStateType = {
    status: "idle",
    isInitialized: false,
    isLoggedIn: false,
    profile: {} as ResponseType
}
type InitialStateType = {
    status: RequestStatusType,
    isInitialized: boolean,
    isLoggedIn: boolean,
    profile: ResponseType
}

export const LoginReducer = (state: InitialStateType = InitialState, action: LoginReducerType) => {
    switch (action.type) {
        case 'login/SET-STATUS':
            return {...state, status: action.status}
        case "login/SET-IS-INITIALISED":
            return {...state, isInitialized: action.Initialized}
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.isLoggedIn}
        case "login/SET-USER-PROFILE":
            return {...state, profile: action.profile}
        default:
            return state
    }
}

export const setLoginStatusAC = (status: RequestStatusType) =>
    ({type: 'login/SET-STATUS', status} as const)
export const setIsInitializedAC = (Initialized: boolean) =>
    ({type: 'login/SET-IS-INITIALISED', Initialized} as const)
export const setIsLoggedInAC = (isLoggedIn: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', isLoggedIn} as const)
export const setUserProfileAC = (profile: ResponseType) => {
    return {type: "login/SET-USER-PROFILE", profile} as const
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type setLoginStatusAT = ReturnType<typeof setLoginStatusAC>
type setIsInitializedAT = ReturnType<typeof setIsInitializedAC>
type setIsLoggedInAT = ReturnType<typeof setIsLoggedInAC>
type setUserProfileAT = ReturnType<typeof setUserProfileAC>

type LoginReducerType =
    | setLoginStatusAT
    | setIsInitializedAT
    | setIsLoggedInAT
    | setUserProfileAT

const LogInLogOutFlow = (dispatch: Dispatch, value: boolean) => {
    dispatch(setIsInitializedAC(value))
}

export const LoginTC = (data: loginParamsType) =>
    (dispatch: Dispatch) => {
        dispatch(setPreloaderStatusAC('loading'))
        authAPI.login(data)
            .then(res => {
                LogInLogOutFlow(dispatch, true)
                dispatch(setUserProfileAC(res.data))
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(setErrorMessageAC(error))
            })
            .finally(() => {
                dispatch(setPreloaderStatusAC('succeeded'))
            })
    }

export const LogoutTC = () => (dispatch: Dispatch) => {
    dispatch(setPreloaderStatusAC('loading'))
    authAPI.logout().then(res => {
        LogInLogOutFlow(dispatch, false)
        dispatch(setPreloaderStatusAC('succeeded'))
    })
}

export const setUserProfileTC = () =>
    async (dispatch: Dispatch) => {
        const res = await authAPI.me()
        dispatch(setUserProfileAC(res.data))
    }