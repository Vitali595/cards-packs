import {forgotAPI} from "../api/ForgorAPI";
import {Dispatch} from "redux";

export const InitialState = {
    loading: false,
    success: false,
    error: ""
}

export const ForgotReducer = (state: InitialStateType = InitialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "forgot/SET_ERROR": {
            return {
                ...state,
                error: action.error,
                loading: false,
                success: false
            }
        }
        case "forgot/SET_LOADING": {
            return {
                ...state,
                error: "",
                loading: action.loading,
                success: false
            }
        }
        case "forgot/SET_SUCCESS": {
            return {
                ...state,
                error: "",
                loading: false,
                success: action.success
            }
        }
        default: {
            return state
        }
    }
}

export const setLoadingAC = (loading: boolean) => ({type: "forgot/SET_LOADING", loading} as const)
export const setSuccessAC = (success: boolean) => ({type: "forgot/SET_SUCCESS", success} as const)
export const setErrorAC = (error: string) => ({type: "forgot/SET_ERROR", error} as const)

export const forgotTC = (email: string) => async (dispatch: ThunkDispatch) => {
    dispatch(setLoadingAC(true))

    try {
        await forgotAPI.forgot(email)
        dispatch(setSuccessAC(true))
    } catch (err) {
        const error = err.response ? err.response.data.error : "some error... Please try again."
        dispatch(setErrorAC(error))
    }
}

type SetLoadingActionType = ReturnType<typeof setLoadingAC>
type SetSuccessActionType = ReturnType<typeof setSuccessAC>
type SetErrorActionType = ReturnType<typeof setErrorAC>

type ActionType = SetLoadingActionType | SetSuccessActionType | SetErrorActionType
type ThunkDispatch = Dispatch<ActionType>
type InitialStateType = typeof InitialState