import React from "react";
import mailImg from "../../../assets/images/Group 281.png"
import style from "./CheckPage.module.css";
import {SuperHeader} from "../../../common/c6-SuperHeader/SuperHeader";

export const CheckPage: React.FC = () => {
    return (
        <div className={style.paper}>
            <SuperHeader/>
            <div>
                <img src={mailImg}/>
            </div>
            <div className={style.title}>Check Email</div>
            <div className={style.description}>We’ve sent an Email with instructions to your email address</div>
        </div>
    )
}