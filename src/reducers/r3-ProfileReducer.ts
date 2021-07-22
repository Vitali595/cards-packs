const initialState = {}
type InitialStateType = typeof initialState

export const ProfileReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export const AC = () => {
    return {type: ""} as const
}

type AT = ReturnType<typeof AC>

type ActionType = AT

