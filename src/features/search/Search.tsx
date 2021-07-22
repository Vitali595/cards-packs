import React, {ChangeEvent, useState} from "react";
import {Slider} from "@material-ui/core";
import s from "./Search.module.css";

type SearchPropsType = {
    searchCallback: (value0: number, value1: number, text: string) => void
}

export const Search: React.FC<SearchPropsType> = ({searchCallback}) => {

    const [text, setText] = useState<string>("")

    const [value, setValue] = useState<number[]>([0, 1000]);
    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[])
    }

    const onSearchCallback = () => {
        searchCallback(value[0], value[1], text)
    }

    const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    return (
        <div>
            <input onChange={onChangeTextHandler} value={text}/>
            <div className={s.range}>
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                />
            </div>
            <button onClick={onSearchCallback}>Search</button>
        </div>
    )
}