import React, {useEffect} from "react"
import style from "./CardsList.module.css"
import {SuperPaper} from "../../common/c7-SuperPaper/SuperPaper";
import {CardsTable} from "./cardsTable/CardsTable";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {useParams} from "react-router-dom";
import {setCardsTC} from "../../reducers/r10-CardsReducer";

type CardsListPropsType = {
    packName: string
    packId: string
}

export const CardsList: React.FC<CardsListPropsType> = ({packName, packId}) => {

    const dispatch = useDispatch()

    const {
        maxGrade, minGrade, sortCards, page, pageCount, searchCardQuestion,
    } = useSelector((state: AppRootStateType) => state.cards)

    useEffect(() => {
        dispatch(setCardsTC(packId, maxGrade, minGrade, page, pageCount, searchCardQuestion, sortCards))
    }, [dispatch, packId])


    return (
        <SuperPaper>
            <div className={style.cardsTable}>
                <CardsTable packName={packName} packId={packId}/>
            </div>
        </SuperPaper>
    )
}