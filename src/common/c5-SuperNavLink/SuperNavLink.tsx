import React from "react"
import {NavLink} from "react-router-dom"
import style from "./SuperNavLink.module.css"

type SuperNavLinkPropsType = {
    path: string
    text: string
}

export const SuperNavLink: React.FC<SuperNavLinkPropsType> = ({path, text}) => {
    return (
        <div>
            <NavLink to={path} style={{textDecoration: "none"}}><span
                className={style.text}>{text}</span></NavLink>
        </div>
    )
}