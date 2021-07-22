import {Dispatch} from "redux";
import {setPassAPI} from "../api/SetPassAPI";

export const InitialState = {
    loading: false,
    success: false,
    error: ""
}

export const SetPassReducer = (state: InitialStateType = InitialState, action: ActionType) => {
    switch (action.type) {
        case "setPass/SET_ERROR": {
            return {
                ...state,
                error: action.error,
                loading: false,
                success: false
            }
        }
        case "setPass/SET_LOADING": {
            return {
                ...state,
                error: "",
                loading: action.loading,
                success: false
            }
        }
        case "setPass/SET_SUCCESS": {
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

export const setLoadingAC = (loading: boolean) => ({type: "setPass/SET_LOADING", loading} as const)
export const setSuccessAC = (success: boolean) => ({type: "setPass/SET_SUCCESS", success} as const)
export const setErrorAC = (error: string) => ({type: "setPass/SET_ERROR", error} as const)

export const setPassTC = (token: string, password: string, password2: string) => async (dispatch: ThunkDispatch) => {
    dispatch(setLoadingAC(true))

    try {
        if (password !== password2) dispatch(setErrorAC("Passwords don't match!"))
        else {
            const data = await setPassAPI.setPass(token, password)
            dispatch(setSuccessAC(true))
        }
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
