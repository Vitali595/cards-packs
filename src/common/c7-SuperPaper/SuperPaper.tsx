import React from "react"
import style from "./SuperPaper.module.css"
import {FormControl} from "@material-ui/core";
import defaultAvatar from "../../assets/images/defaultAvatar.png";
import {SuperSmallButton} from "../c3-SuperSmallButton/SuperSmallButton";
import {SuperButton} from "../c2-SuperButton/SuperButton";
import {PacksTable} from "../../components/Forgot/table/PacksTable";
import {Paginator} from "../../features/pagination/Paginator";

type SuperPaperPropsType = {
    text?: string
}

export const SuperPaper: React.FC<SuperPaperPropsType> = ({text, children}) => {
    return (
        <div className={style.paper}>
                {children}
        </div>
    )
}