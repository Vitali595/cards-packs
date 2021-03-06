import React, {ChangeEvent, useEffect, useState} from "react"
import {Slider} from "@material-ui/core"
import style from "./Search.module.css"
import {SuperButton} from "../../common/c2-SuperButton/SuperButton"

type SearchPropsType = {
    searchCallback: (value0: number, value1: number, text: string) => void
    isOpenCallback: () => void
    buttonName: string
    isMyCards?: boolean

}

export const Search: React.FC<SearchPropsType> = ({searchCallback, isOpenCallback, buttonName, isMyCards = true}) => {

    const [text, setText] = useState<string>("")
    const [value, setValue] = useState<number[]>([0, 1000])

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[])
    }

    const onSearchCallback = () => {
        searchCallback(value[0], value[1], text)
    }

    const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    useEffect(() => {
        setText("")
    }, [])

    return (
        // <div>
        //     <input onChange={onChangeTextHandler} value={text}/>
        //     <div className={s.range}>
        //         <Slider
        //             value={value}
        //             onChange={handleChange}
        //             valueLabelDisplay="auto"
        //             aria-labelledby="range-slider"
        //         />
        //     </div>
        //     <button onClick={onSearchCallback}>Search</button>
        <div className={style.search}>
            <div className={style.cell} id="container">
                <div><input type="search" placeholder="Search..." onChange={onChangeTextHandler} value={text}/></div>
            </div>
            <SuperButton text={"Search"} onClick={onSearchCallback}/>
            {isMyCards && <SuperButton text={buttonName} onClick={isOpenCallback}/>}
        </div>
    )
}