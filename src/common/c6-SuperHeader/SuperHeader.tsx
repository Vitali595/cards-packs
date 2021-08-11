import React from "react"
import style from "./SuperHeader.module.css"

type SuperHeaderPropsType = {
    text?: string
}

export const SuperHeader: React.FC<SuperHeaderPropsType> = ({text}) => {
    return (
        <>
            <div className={style.header}>Cards-Packs</div>
            <div className={style.text}>{text}</div>
        </>
    )
}