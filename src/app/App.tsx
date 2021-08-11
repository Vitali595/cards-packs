import React, {useEffect} from "react"
import {Route, Switch} from "react-router-dom"
import style from "./App.module.css"
import {SignIn} from "../components/SignIn/SignIn"
import {SignUp} from "../components/SignUp/SignUp"
import {Profile} from "../components/Profile/Profile"
import {Forgot} from "../components/Forgot/Forgot"
import {SetPass} from "../components/SetPass/SetPass"
import {Header} from "../components/Header/Header"
import PacksList from "../components/Pack/Pack"
import {useDispatch, useSelector} from "react-redux"
import {setUserProfileTC} from "../reducers/r2-LoginReducer"
import Cards from "../components/Cards/Cards"
import {AppRootStateType} from "./store"
import {Learn} from "../components/Learn/Learn"
import {MainPage} from "../components/MainPage/MainPage";

function App() {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.signIn.isLoggedIn)

    useEffect(()=>{
        if (!isLoggedIn){
            dispatch(setUserProfileTC())
        }
    },[dispatch])


    return (
        <div className={style.app}>
            {/*<Header/>*/}
            <Switch>
                <Route path="/main" render={() => <MainPage/>}/>
                <Route path="/log_in" render={() => <SignIn/>}/>
                <Route path="/log_up" render={() => <SignUp/>}/>
                {/*<Route path="/profile" render={() => <Profile/>}/>*/}
                <Route path="/forgot" render={() => <Forgot/>}/>
                <Route path="/pack" render={() => <PacksList/>}/>
                <Route path="/cards/:cardsPackId" render={() => <Cards/>}/>
                <Route path="/set_new_password/:token" render={() => <SetPass/>}/>
                <Route path="/learn/:id" render={() => <Learn/>}/>
                <Route path="/*" render={() => <SignIn/>}/>
            </Switch>
        </div>
    );
}

export default App;
