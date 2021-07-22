import React from "react";

type SortPacksPropsType = {
    sortHandler1: (title: string) => void
    sortHandler0: (title: string) => void
    title: string
}

export const SortElements: React.FC<SortPacksPropsType> = ({sortHandler1, sortHandler0, title}) => {

    const onSortHandler1 = () => {
        sortHandler1(`1${title}`)
    }
    const onSortHandler0 = () => {
        sortHandler0(`0${title}`)

    }
    return (
        <div>
            <div>
                <button onClick={onSortHandler1}>/\</button>
            </div>
            <div>
                <button onClick={onSortHandler0}>\/</button>
            </div>
        </div>
    )
}