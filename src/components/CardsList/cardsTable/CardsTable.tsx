import React, {useEffect, useState} from "react"
import style from "./CardsTable.module.css"
import {Modal} from "../../ModalWindow/ModalWindow";
import {Button, TextField} from "@material-ui/core";
import {Search} from "../../../features/search/Search";
import {updateCardPackTC} from "../../../reducers/r9-PacksReducer";
import {SuperSmallButton} from "../../../common/c3-SuperSmallButton/SuperSmallButton";
import {Paginator} from "../../../features/pagination/Paginator";
import {setCardsTC} from "../../../reducers/r10-CardsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {useParams} from "react-router-dom";

type CardsTablePropsType = {
    packName: string
    packId: string
}

export const CardsTable: React.FC<CardsTablePropsType> = ({packName, packId}) => {

    const dispatch = useDispatch();
    const {
        cards,
        cardsTotalCount,
        maxGrade,
        sortCards,
        minGrade,
        page,
        pageCount,
        searchCardQuestion,
    } = useSelector((state: AppRootStateType) => state.cards)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const [updatingPackId, setUpdatingPackId] = useState("")
    const onCloseUpdate = () => setUpdatingPackId("")
    const [deletedPackId, setDeletedPackId] = useState("")
    const onClose = () => setIsOpen(false)
    const onCloseDelete = () => setDeletedPackId("")

    const searchCallback = (value0: number, value1: number, text: string) => {
        dispatch(
            setCardsTC(packId, value1, value0, page, pageCount, text, sortCards)
        )
    }

    const onPageChanged = (pageNumber: number) => {
        dispatch(setCardsTC(packId, maxGrade, minGrade, pageNumber, pageCount, searchCardQuestion, sortCards))
    }

    const selectCallback = (value: string) => {
        dispatch(setCardsTC(packId, maxGrade, minGrade, page, +value, searchCardQuestion, sortCards))
    }

    const isOpenCallback = () => {
        setIsOpen(true)
    }

    return (
        <>
            {isOpen &&
            <Modal
                title={"Add new card"}
                // content={<TextField style={{width: "100%"}} value={title} onChange={createTitle} label="Name card"/>}
                content={""}
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
                        // onClick={addNewCardPack}
                    >
                        <div className={style.save}>Save</div>
                    </Button>
                </tr>}
                onClose={onClose}
            />
            }
            <div className={style.header}>{packName}</div>
            <Search searchCallback={searchCallback} isOpenCallback={isOpenCallback} buttonName={"Add new card"}/>
            <table className={style.table}>
                <thead className={style.thead}>
                <tr className={style.tr}>
                    <td className={style.td}>Question</td>
                    <td className={style.td}>Answer</td>
                    <td className={style.td}>Last Updated</td>
                    <td className={style.td}>Grade</td>
                    <td className={style.td}>Actions</td>
                </tr>
                </thead>
                <tbody className={style.tbody}>
                {cards.map((card) => {

                    // const updateCardPack = () => {
                    //     dispatch(updateCardPackTC(pack.user_id, pack._id, title))
                    //     setTitle("")
                    //     setUpdatingPackId("")
                    // }

                    return (
                        <>
                            {/*{deletedPackId === pack._id && (*/}
                            {/*    <Modal*/}
                            {/*        title={"Delete Pack"}*/}
                            {/*        content={`Do you really want to remove ${pack.name}? All cards will be excluded from this course.`}*/}
                            {/*        footer={*/}
                            {/*            <tr className={style.buttons}>*/}
                            {/*                <Button*/}
                            {/*                    style={{background: "#D7D8EF", borderRadius: "30px", width: "120px"}}*/}
                            {/*                    variant="contained"*/}
                            {/*                    size={"large"}*/}
                            {/*                    onClick={onCloseDelete}*/}
                            {/*                >*/}
                            {/*                    <div className={style.cancel}>Cancel</div>*/}
                            {/*                </Button>*/}
                            {/*                <Button*/}
                            {/*                    style={{background: "#21268F", borderRadius: "30px", width: "120px"}}*/}
                            {/*                    variant="contained"*/}
                            {/*                    size={"large"}*/}
                            {/*                    onClick={() => deleteCardPack(pack._id)}*/}
                            {/*                >*/}
                            {/*                    <div className={style.save}>Delete</div>*/}
                            {/*                </Button>*/}
                            {/*            </tr>*/}
                            {/*        }*/}
                            {/*        onClose={onCloseDelete}*/}
                            {/*    />*/}
                            {/*)}*/}
                            {/*{updatingPackId === pack._id && (*/}
                            {/*    <Modal*/}
                            {/*        title={"Edit pack name"}*/}
                            {/*        content={<TextField style={{width: "100%"}} value={title} onChange={createTitle}*/}
                            {/*                            label="New pack name"/>}*/}
                            {/*        footer={*/}
                            {/*            <tr className={style.buttons}>*/}
                            {/*                <Button*/}
                            {/*                    style={{background: "#D7D8EF", borderRadius: "30px", width: "120px"}}*/}
                            {/*                    variant="contained"*/}
                            {/*                    size={"large"}*/}
                            {/*                    onClick={onCloseUpdate}*/}
                            {/*                >*/}
                            {/*                    <div className={style.cancel}>Cancel</div>*/}
                            {/*                </Button>*/}
                            {/*                <Button*/}
                            {/*                    style={{background: "#21268F", borderRadius: "30px", width: "120px"}}*/}
                            {/*                    variant="contained"*/}
                            {/*                    size={"large"}*/}
                            {/*                    onClick={updateCardPack}*/}
                            {/*                >*/}
                            {/*                    <div className={style.save}>Delete</div>*/}
                            {/*                </Button>*/}
                            {/*            </tr>*/}
                            {/*        }*/}
                            {/*        onClose={() => setUpdatingPackId("")}*/}
                            {/*    />*/}
                            {/*)}*/}
                                <tr className={style.tr} key={card._id}>
                                    <td className={style.td}>{card.question}</td>
                                    <td className={style.td}>{card.answer}</td>
                                    <td className={style.td}>{card.updated}</td>
                                    <td className={style.td}>{card.grade}</td>
                                    <td className={style.td}>
                                        {/*{pack.user_id === profile._id*/}
                                        {/*&& <SuperSmallButton onClick={() => setDeletedPackId(pack._id)} text={"Delete"}*/}
                                        {/*                     option={"red"}/>}*/}
                                        {/*{pack.user_id === profile._id*/}
                                        {/*&& <SuperSmallButton onClick={() => setUpdatingPackId(pack._id)} text={"Edit"}/>}*/}
                                        {/*<SuperSmallButton text={"Learn"} disabled={pack.cardsCount === 0}/>*/}
                                    </td>
                                </tr>
                        </>)
                })}
                </tbody>
            </table>
            <Paginator totalItemsCount={cardsTotalCount} currentPage={page} pageSize={pageCount}
                       onPageChanged={onPageChanged} selectCallback={selectCallback}/>
        </>
    )
}