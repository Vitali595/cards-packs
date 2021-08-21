import React, {useEffect, useState} from "react"
import style from "./PacksList.module.css"
import {PacksTable} from "../Forgot/table/PacksTable"
import {SuperPaper} from "../../common/c7-SuperPaper/SuperPaper"
import {setPacksListTC} from "../../reducers/r9-PacksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {ResponseType} from "../../api/LoginAPI";

type PacksListPropsType = {
    isPrivate: boolean,
    setCardsList: (packName: string, packId: string) => void
}

export const PacksList: React.FC<PacksListPropsType> = ({isPrivate, setCardsList}) => {

    const [switchOn, setSwitchOn] = useState<boolean>(false)
    const dispatch = useDispatch()
    const profile = useSelector<AppRootStateType, ResponseType>(state => state.signIn.profile)
    const {
        cardPacks, page, pageCount, minCardsCount, maxCardsCount,
        sortPacks, cardPacksTotalCount, searchPackName
    } = useSelector((state: AppRootStateType) => state.packs)

    const my = {
        background: switchOn ? "#9A91C8" : "#FFFFFF",
        opacity: switchOn ? "" : "0.5",
        borderRadius: "2px",
        width: "96px",
        height: "36px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const all = {
        background: switchOn ? "#FFFFFF" : "#9A91C8",
        opacity: switchOn ? "0.5" : "",
        borderRadius: "2px",
        width: "96px",
        height: "36px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    useEffect(() => {
        if (isPrivate) {
            dispatch(setPacksListTC(profile._id, pageCount, page, "", minCardsCount, maxCardsCount, sortPacks))
        } else {
            dispatch(setPacksListTC(undefined, pageCount, page, "", minCardsCount, maxCardsCount, sortPacks))
        }
    }, [])

    const getMyPacks = () => {
        setSwitchOn(true)
        dispatch(setPacksListTC(profile._id, pageCount, page, "", minCardsCount, maxCardsCount, sortPacks))
    }

    const getAllPacks = () => {
        setSwitchOn(false)
        dispatch(setPacksListTC(undefined, pageCount, page, "", minCardsCount, maxCardsCount, sortPacks))
    }

    return (
        <SuperPaper>
            <div className={style.leftColumn}>
                <div className={style.text}>Show packs cards</div>
                <div className={style.toggle}>
                    <div style={my} className={style.common} onClick={getMyPacks}>My</div>
                    <div style={all} className={style.common} onClick={getAllPacks}>All</div>
                </div>
            </div>
            <div className={style.packsTable}>
                <PacksTable header={"Packs list"} isPrivate={switchOn} setCardsList={setCardsList}/>
            </div>
        </SuperPaper>
    )
}