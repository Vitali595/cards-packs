import {Button} from "@material-ui/core";
import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {RequestStatusType} from "../../reducers/r8-PreloaderReducer";

type DisabledButtonProps = {
    title: string
    callback?: () => void
    variant?: "text" | "outlined" | "contained" | undefined
}

export const DisabledButton = (props: DisabledButtonProps) => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.status.status)
    return (
        <Button disabled={status === 'loading'}
                type={'submit'}
                variant={props.variant}
                color={'primary'}
                onClick={props.callback}
        >{props.title}</Button>
    )
}