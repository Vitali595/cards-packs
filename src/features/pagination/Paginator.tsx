import React, {useState} from "react";
import s from "./Paginator.module.css";

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize?: number
    currentPage?: number
    portionSize?: number
    onPageChanged: (page: number) => void
}

export const Paginator: React.FC<PaginatorPropsType> = (
    {totalItemsCount, pageSize, currentPage, portionSize = 10, onPageChanged}
) => {

    const pagesCount = Math.ceil(totalItemsCount / (pageSize ? pageSize : 1))

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    const prevPacksHandler = () => {
        setPortionNumber(portionNumber - 1)
    }
    const nextPacksHandler = () => {
        setPortionNumber(portionNumber + 1)
    }

    return <div className={s.paginator}>
        {portionNumber > 1 &&
        <button onClick={prevPacksHandler}>PREV</button>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span key={p}
                             className={currentPage === p ? s.selectedPage : s.pageNumber}
                             onClick={(e) => {
                                 onPageChanged(p)
                             }}
                >{p}</span>
            })}
        {portionCount > portionNumber &&
        <button onClick={nextPacksHandler}>NEXT</button>}
    </div>
}