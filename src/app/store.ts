import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {SignUpReducer} from "../reducers/r1-LogupReducer";
import {SetPassReducer} from "../reducers/r4-SetPassReducer";
import {ForgotReducer} from "../reducers/r7-ForgotReducer";
import {SignInReducer} from "../reducers/r2-LoginReducer";
import {PreloaderReducer} from "../reducers/r8-PreloaderReducer";
import {ErrorReducer} from "../reducers/r6-ErrorReducer";
import {PacksReducer} from "../reducers/r9-PacksReducer";
import {ProfileReducer} from "../reducers/r3-ProfileReducer";
import {CardsReducer} from "../reducers/r10-CardsReducer";

const rootReducer = combineReducers({
    profile: ProfileReducer,
    signIn: SignInReducer,
    signUp: SignUpReducer,
    setPass: SetPassReducer,
    forgot: ForgotReducer,
    error: ErrorReducer,
    status: PreloaderReducer,
    packs: PacksReducer,
    cards: CardsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
