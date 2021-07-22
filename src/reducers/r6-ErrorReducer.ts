const initialState = {
    error: null
}

type InitialStateType = {
        error: string | null
    }

export const ErrorReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'ERROR/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}
export const setErrorMessageAC = (error: string | null) => ({type: 'ERROR/SET-ERROR', error} as const)

type setErrorMessageAT = ReturnType<typeof setErrorMessageAC>

type ActionsType = setErrorMessageAT