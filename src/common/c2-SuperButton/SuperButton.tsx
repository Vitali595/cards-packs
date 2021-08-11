import React from "react"
import style from "./SuperButton.module.css"

type SuperButtonPropsType = {
    text: string
    disabled?: boolean
    onClick?: () => void
}

export const SuperButton: React.FC<SuperButtonPropsType> = ({text, disabled, onClick}) => {
    return (
        <div>
            <button className={style.button} disabled={disabled} onClick={onClick}>
                <div className={style.text}>{text}</div>
            </button>
        </div>
    )
}