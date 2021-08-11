import React, {useState} from "react"
import style from "./Paginator.module.css"
import prev from "../../assets/images/prev.png"
import next from "../../assets/images/next.png"

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize?: number
    currentPage?: number
    portionSize?: number
    onPageChanged: (page: number) => void
    selectCallback: (value: string) => void
}

export const Paginator: React.FC<PaginatorPropsType> = (
    {
        totalItemsCount, pageSize, currentPage,
        portionSize = 10, onPageChanged, selectCallback
    }
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

    return <div className={style.paginator}>
        {portionNumber > 1 ?
            <img className={style.arrow} src={prev} onClick={prevPacksHandler}/> :
            <img className={style.arrow} src={prev}/>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span key={p}
                             className={currentPage === p ? style.selectedPage : style.pageNumber}
                             onClick={() => {
                                 onPageChanged(p)
                             }}
                >{p}</span>
            })}
        {portionCount > portionNumber ?
            <img className={style.arrow} src={next} onClick={nextPacksHandler}/> :
            <img className={style.arrow} src={next}/>}
        <span className={style.show}>Show</span>
        <select className={style.select} onChange={(e) => selectCallback(e.currentTarget.value)}>
            <option>4</option>
            <option>6</option>
            <option>8</option>
        </select>
    </div>
}