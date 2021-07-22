export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType
}

type InitialStateType = typeof initialState

export const PreloaderReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'PRELOADER/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}
export const setPreloaderStatusAC = (status: RequestStatusType) => ({type: 'PRELOADER/SET-STATUS', status} as const)
type setPreloaderStatusAT = ReturnType<typeof setPreloaderStatusAC>
type ActionsType = setPreloaderStatusAT