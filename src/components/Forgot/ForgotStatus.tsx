import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";


export const ForgotStatus: React.FC = React.memo(() => {
    const {loading, success, error} = useSelector((state: AppRootStateType) => state.forgot)

    return <>
        {loading
            ? <div><CircularProgress/></div>
            : error
                ? <div style={{color: "red"}}>{error}<br/></div>
                : success
                    ? <div style={{color: "green"}}>Success!</div>
                    : <div><br/><br/></div>
        }
    </>
})
