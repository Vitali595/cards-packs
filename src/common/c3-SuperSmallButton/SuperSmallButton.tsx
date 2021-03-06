import React from "react"
import style from "./SuperSmallButton.module.css"

type SuperSmallButtonPropsType = {
    text: string
    option?: string
    disabled?: boolean
    onClick?: () => void
}

export const SuperSmallButton: React.FC<SuperSmallButtonPropsType> = (
    {text, option, disabled, onClick}
) => {
    return (
        <>
            <button
                style={text === "Edit profile" ? {border: "1px solid #a6a0c3"} : {border: "none"}}
                className={option === "red" ? style.redButton : style.button} disabled={disabled}
                onClick={onClick}
            >
                {text}
            </button>
        </>
    )
}