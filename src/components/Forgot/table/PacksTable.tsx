import React, {ChangeEvent, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import style from "./PacksTable.module.css"
import {AppRootStateType} from "../../../app/store";
import {createNewCardPackTC, setPacksListTC} from "../../../reducers/r9-PacksReducer";
import {ResponseType} from "../../../api/LoginAPI";
import {SuperSmallButton} from "../../../common/c3-SuperSmallButton/SuperSmallButton";
import {SuperButton} from "../../../common/c2-SuperButton/SuperButton";
import {Paginator} from "../../../features/pagination/Paginator";
import {Search} from "../../../features/search/Search";
import {Modal} from "../../ModalWindow/ModalWindow";

type PacksTablePropsType = {
    header: string
    isPrivate: boolean
}

export const PacksTable: React.FC<PacksTablePropsType> = ({header, isPrivate}) => {

    const dispatch = useDispatch()
    const profile = useSelector<AppRootStateType, ResponseType>(state => state.signIn.profile)
    const {
        cardPacks, page, pageCount, minCardsCount, maxCardsCount,
        sortPacks, cardPacksTotalCount, searchPackName
    } = useSelector((state: AppRootStateType) => state.packs)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const onClose = () => setIsOpen(false)

    // const setPrivatePacks = (e: ChangeEvent<HTMLInputElement>) => {
    //     setIsPrivatePacks(e.currentTarget.checked)
    //     if (isPrivatePacks) {
    //         dispatch(setPacksListTC(undefined, pageCount, page, searchPackName, minCardsCount, maxCardsCount, sortPacks))
    //     } else {
    //         dispatch(setPacksListTC(profile._id, pageCount, page, searchPackName, minCardsCount, maxCardsCount, sortPacks))
    //     }
    // }

    const createTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addNewCardPack = () => {
        dispatch(createNewCardPackTC(profile._id, title))
        setTitle("")
        setIsOpen(false)
    }

    const selectCallback = (value: string) => {
        if (isPrivate) {
            dispatch(setPacksListTC(profile._id, +value, page, searchPackName, minCardsCount, maxCardsCount, sortPacks))
        } else {
            dispatch(setPacksListTC(undefined, +value, page, searchPackName, minCardsCount, maxCardsCount, sortPacks))
        }
    }

    const onPageChanged = (pageNumber: number) => {
        if (isPrivate) {
            dispatch(setPacksListTC(profile._id, pageCount, pageNumber, searchPackName, minCardsCount, maxCardsCount, sortPacks))
        } else {
            dispatch(setPacksListTC(undefined, pageCount, pageNumber, searchPackName, minCardsCount, maxCardsCount, sortPacks))
        }
    }

    const searchCallback = (value0: number, value1: number, text: string) => {
        if (isPrivate) {
            dispatch(setPacksListTC(profile._id, pageCount, page, text, value0, value1, sortPacks))
        } else {
            dispatch(setPacksListTC(undefined, pageCount, page, text, value0, value1, sortPacks))
        }
    }

    const isOpenCallback = () => {
        setIsOpen(true)
    }

    return (
        <>
            {isOpen &&
            <Modal
                title={"Add new pack"}
                content={<input value={title} onChange={createTitle}/>}
                footer={<tr>
                    <button onClick={addNewCardPack}>add</button>
                    <button onClick={onClose}>Close</button>
                </tr>}
                onClose={onClose}
            />
            }
            <div className={style.header}>{header}</div>
            <Search searchCallback={searchCallback} isOpenCallback={isOpenCallback}/>
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
                            {pack.user_id === profile._id && <SuperSmallButton text={"Delete"} option={"red"}/>}
                            {pack.user_id === profile._id && <SuperSmallButton text={"Edit"}/>}
                            <SuperSmallButton text={"Learn"} disabled={pack.cardsCount === 0}/>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
            <Paginator totalItemsCount={cardPacksTotalCount} currentPage={page} pageSize={pageCount}
                       onPageChanged={onPageChanged} selectCallback={selectCallback}/>
        </>
    )
}