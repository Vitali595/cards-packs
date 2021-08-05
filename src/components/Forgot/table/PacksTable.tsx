import React, {ChangeEvent, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import style from "./PacksTable.module.css"
import {AppRootStateType} from "../../../app/store";
import {setPacksListTC} from "../../../reducers/r9-PacksReducer";
import {useHistory} from "react-router-dom";
import {ResponseType} from "../../../api/LoginAPI";
import {SuperSmallButton} from "../../../common/c3-SuperSmallButton/SuperSmallButton";

export const PacksTable: React.FC = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const profile = useSelector<AppRootStateType, ResponseType>(state => state.signIn.profile)
    const {
        cardPacks, page, pageCount, minCardsCount, maxCardsCount,
        sortPacks, cardPacksTotalCount, searchPackName
    } = useSelector((state: AppRootStateType) => state.packs)
    const [isPrivatePacks, setIsPrivatePacks] = useState<boolean>(false)

    const setPrivatePacks = (e: ChangeEvent<HTMLInputElement>) => {
        setIsPrivatePacks(e.currentTarget.checked)
        if (isPrivatePacks) {
            dispatch(setPacksListTC(undefined, pageCount, page, searchPackName, minCardsCount, maxCardsCount, sortPacks))
        } else {
            dispatch(setPacksListTC(profile._id, pageCount, page, searchPackName, minCardsCount, maxCardsCount, sortPacks))
        }
    }

    return (
        <div>
            {/*<input type={"checkbox"} checked={isPrivatePacks} onChange={setPrivatePacks}/>*/}
            <table className={style.table}>
                <thead className={style.thead}>
                <tr className={style.tr}>
                    <td className={style.td}>Name</td>
                    <td className={style.td}>Cards</td>
                    <td className={style.td}>Last Updated</td>
                    <td className={style.td}>Created by</td>
                    <td className={style.td}>Actions</td>
                </tr>
                </thead>
                <tbody className={style.tbody}>
                {cardPacks.map((pack) => {

                    return <tr className={style.tr} key={pack._id}>
                        <td className={style.td}>{pack.name}</td>
                        <td className={style.td}>{pack.cardsCount}</td>
                        <td className={style.td}>{pack.updated}</td>
                        <td className={style.td}>{pack.created}</td>
                        <td className={style.td}>
                            <SuperSmallButton text={"Delete"} option={"red"}/>
                            <SuperSmallButton text={"Edit"}/>
                            <SuperSmallButton text={"Learn"}/>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>

    )
}