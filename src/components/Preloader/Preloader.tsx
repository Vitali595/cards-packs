import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {RequestStatusType} from "../../reducers/r8-PreloaderReducer";
import {LinearProgress} from "@material-ui/core";
import React from "react";

export const Preloader = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.status.status)
    return (
        <div>
            {status === 'loading' &&  <LinearProgress/>}
        </div>
    )
}