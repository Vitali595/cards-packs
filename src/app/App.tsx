import React, {useEffect} from "react"
import style from "./App.module.css"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "./store"
import {Route, Switch} from "react-router-dom";
import {MainPage} from "../components/MainPage/MainPage";
import {SignIn} from "../components/SignIn/SignIn";
import {SignUp} from "../components/SignUp/SignUp";
import {Forgot} from "../components/Forgot/Forgot";
import {PacksList} from "../components/PacksList/PacksList";
import Cards from "../components/Cards/Cards";
import {SetPass} from "../components/SetPass/SetPass";
import {Learn} from "../components/Learn/Learn";
import {setUserProfileTC} from "../reducers/r2-LoginReducer";


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
                <Route path="/pack" render={() => <PacksList isPrivate={true}/>}/>
                <Route path="/cards/:cardsPackId" render={() => <Cards/>}/>
                <Route path="/set_new_password/:token" render={() => <SetPass/>}/>
                <Route path="/learn/:id" render={() => <Learn/>}/>
                <Route path="/*" render={() => <SignIn/>}/>
            </Switch>
        </div>
    );
}

export default App;
