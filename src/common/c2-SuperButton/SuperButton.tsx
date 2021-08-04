import React from "react"
import style from "./SuperButton.module.css"

type SuperButtonPropsType = {
    text: string
    disabled?: boolean
}

export const SuperButton: React.FC<SuperButtonPropsType> = ({text, disabled}) => {
    return (
        <div>
            <button className={style.button} disabled={disabled}>
                <div className={style.text}>{text}</div>
            </button>
        </div>
    )
}