import React, {ChangeEvent, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import style from "./PacksTable.module.css"
import {AppRootStateType} from "../../../app/store";
import {
    createNewCardPackTC,
    deleteCardPackTC,
    setPacksListTC,
    updateCardPackTC
} from "../../../reducers/r9-PacksReducer";
import {ResponseType} from "../../../api/LoginAPI";
import {SuperSmallButton} from "../../../common/c3-SuperSmallButton/SuperSmallButton";
import {SuperButton} from "../../../common/c2-SuperButton/SuperButton";
import {Paginator} from "../../../features/pagination/Paginator";
import {Search} from "../../../features/search/Search";
import {Modal} from "../../ModalWindow/ModalWindow";
import {Button, TextField} from "@material-ui/core";
import {Redirect, useHistory} from "react-router-dom";

type PacksTablePropsType = {
    header: string
    isPrivate: boolean
    setCardsList: (packName: string, packId: string) => void
}

export const PacksTable: React.FC<PacksTablePropsType> = ({header, isPrivate, setCardsList}) => {

    const history = useHistory();
    const dispatch = useDispatch()
    const profile = useSelector<AppRootStateType, ResponseType>(state => state.signIn.profile)
    const {
        cardPacks, page, pageCount, minCardsCount, maxCardsCount,
        sortPacks, cardPacksTotalCount, searchPackName
    } = useSelector((state: AppRootStateType) => state.packs)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const [updatingPackId, setUpdatingPackId] = useState("")
    const onCloseUpdate = () => setUpdatingPackId("")
    const [deletedPackId, setDeletedPackId] = useState("")
    const onClose = () => setIsOpen(false)
    const onCloseDelete = () => setDeletedPackId("")

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

    const deleteCardPack = (packId: string) => {
        dispatch(deleteCardPackTC(profile._id, packId))
        setUpdatingPackId("")
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
                content={<TextField style={{width: "100%"}} value={title} onChange={createTitle} label="Name pack"/>}
                footer={<tr className={style.buttons}>
                    <Button
                        style={{background: "#D7D8EF", borderRadius: "30px", width: "120px"}}
                        variant="contained"
                        size={"large"}
                        onClick={onClose}
                    >
                        <div className={style.cancel}>Cancel</div>
                    </Button>
                    <Button
                        style={{background: "#21268F", borderRadius: "30px", width: "120px"}}
                        variant="contained"
                        size={"large"}
                        onClick={addNewCardPack}
                    >
                        <div className={style.save}>Save</div>
                    </Button>
                </tr>}
                onClose={onClose}
            />
            }
            <div className={style.header}>{header}</div>
            <Search searchCallback={searchCallback} isOpenCallback={isOpenCallback} buttonName={"Add new pack"}/>
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

                    const updateCardPack = () => {
                        dispatch(updateCardPackTC(pack.user_id, pack._id, title))
                        setTitle("")
                        setUpdatingPackId("")
                    }

                    return (
                        <>
                            {deletedPackId === pack._id && (
                                <Modal
                                    title={"Delete Pack"}
                                    content={`Do you really want to remove ${pack.name}? All cards will be excluded from this course.`}
                                    footer={
                                        <tr className={style.buttons}>
                                            <Button
                                                style={{background: "#D7D8EF", borderRadius: "30px", width: "120px"}}
                                                variant="contained"
                                                size={"large"}
                                                onClick={onCloseDelete}
                                            >
                                                <div className={style.cancel}>Cancel</div>
                                            </Button>
                                            <Button
                                                style={{background: "#21268F", borderRadius: "30px", width: "120px"}}
                                                variant="contained"
                                                size={"large"}
                                                onClick={() => deleteCardPack(pack._id)}
                                            >
                                                <div className={style.save}>Delete</div>
                                            </Button>
                                        </tr>
                                    }
                                    onClose={onCloseDelete}
                                />
                            )}
                            {updatingPackId === pack._id && (
                                <Modal
                                    title={"Edit pack name"}
                                    content={<TextField style={{width: "100%"}} value={title} onChange={createTitle}
                                                        label="New pack name"/>}
                                    footer={
                                        <tr className={style.buttons}>
                                            <Button
                                                style={{background: "#D7D8EF", borderRadius: "30px", width: "120px"}}
                                                variant="contained"
                                                size={"large"}
                                                onClick={onCloseUpdate}
                                            >
                                                <div className={style.cancel}>Cancel</div>
                                            </Button>
                                            <Button
                                                style={{background: "#21268F", borderRadius: "30px", width: "120px"}}
                                                variant="contained"
                                                size={"large"}
                                                onClick={updateCardPack}
                                            >
                                                <div className={style.save}>Delete</div>
                                            </Button>
                                        </tr>
                                    }
                                    onClose={() => setUpdatingPackId("")}
                                />
                            )}
                            <tr className={style.tr} key={pack._id}>
                                <td className={style.td}>
                                    <div className={style.packName} onClick={() => setCardsList(pack.name, pack._id)}>{pack.name}</div>
                                </td>
                                <td className={style.td}>{pack.cardsCount}</td>
                                <td className={style.td}>{pack.updated}</td>
                                <td className={style.td}>{pack.created}</td>
                                <td className={style.td}>
                                    {pack.user_id === profile._id
                                    && <SuperSmallButton onClick={() => setDeletedPackId(pack._id)} text={"Delete"}
                                                         option={"red"}/>}
                                    {pack.user_id === profile._id
                                    && <SuperSmallButton onClick={() => setUpdatingPackId(pack._id)} text={"Edit"}/>}
                                    <SuperSmallButton text={"Learn"} disabled={pack.cardsCount === 0}/>
                                </td>
                            </tr>
                        </>)
                })}
                </tbody>
            </table>
            <Paginator totalItemsCount={cardPacksTotalCount} currentPage={page} pageSize={pageCount}
                       onPageChanged={onPageChanged} selectCallback={selectCallback}/>
        </>
    )
}