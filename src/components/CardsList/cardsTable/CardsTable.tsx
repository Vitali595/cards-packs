import React, {ChangeEvent, useState} from "react"
import style from "./CardsTable.module.css"
import {Modal} from "../../ModalWindow/ModalWindow";
import {Button, TextField} from "@material-ui/core";
import {Search} from "../../../features/search/Search";
import {SuperSmallButton} from "../../../common/c3-SuperSmallButton/SuperSmallButton";
import {Paginator} from "../../../features/pagination/Paginator";
import {createNewCardTC, deleteCardTC, setCardsTC, updateCardTC} from "../../../reducers/r10-CardsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";

type CardsTablePropsType = {
    packName: string
    packId: string
    userId: string
}

export const CardsTable: React.FC<CardsTablePropsType> = ({packName, packId, userId}) => {

    const dispatch = useDispatch();
    const {
        cards, cardsTotalCount, maxGrade, sortCards, minGrade, page, pageCount, searchCardQuestion
    } = useSelector((state: AppRootStateType) => state.cards)
    const {profile} = useSelector((state: AppRootStateType) => state.signIn)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>("")
    const [answer, setAnswer] = useState<string>("")
    const [updatingCardId, setUpdatingCardId] = useState("")
    const [deletedCardId, setDeletedCardId] = useState("")
    const onClose = () => setIsOpen(false)
    const onCloseUpdate = () => setUpdatingCardId("")
    const onCloseDelete = () => setDeletedCardId("")

    const addNewCard = () => {
        dispatch(createNewCardTC(packId, question, answer, maxGrade, minGrade,
            page, pageCount, searchCardQuestion, sortCards))
        setQuestion("")
        setAnswer("")
        setIsOpen(false)
    }

    const createQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }

    const createAnswer = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer(e.currentTarget.value)
    }

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
                content={
                    <>
                        <TextField style={{width: "100%"}} value={question} onChange={createQuestion} label="Question"/>
                        <TextField style={{width: "100%"}} value={answer} onChange={createAnswer} label="Answer"/>
                    </>
                }
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
                        onClick={addNewCard}
                    >
                        <div className={style.save}>Save</div>
                    </Button>
                </tr>}
                onClose={onClose}
            />
            }
            <div className={style.header}>{packName}</div>
            <Search
                searchCallback={searchCallback}
                isOpenCallback={isOpenCallback}
                buttonName={"Add new card"}
                isMyCards={userId === profile._id}
            />
            <table className={style.table}>
                <thead className={style.thead}>
                <tr className={style.tr}>
                    <td className={style.td}>Question</td>
                    <td className={style.td}>Answer</td>
                    <td className={style.td}>Last Updated</td>
                    <td className={style.td}>Grade</td>
                    {userId === profile._id && <td className={style.td}>Actions</td>}
                </tr>
                </thead>
                <tbody className={style.tbody}>
                {cards.map((card) => {

                    const deleteCard = () => {
                        dispatch(deleteCardTC(card._id, card.cardsPack_id, maxGrade, minGrade,
                            page, pageCount, searchCardQuestion, sortCards))
                    }
                    const updateCard = () => {
                        dispatch(updateCardTC(card._id, card.cardsPack_id, question, answer, maxGrade,
                            minGrade, page, pageCount, searchCardQuestion, sortCards))
                        setQuestion("")
                        setAnswer("")
                        setUpdatingCardId("")
                    }

                    return (
                        <>
                            {deletedCardId === card._id && (
                                <Modal
                                    title={"Delete Card"}
                                    content={`Do you really want to remove card: <<${card.question}>>?`}
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
                                                onClick={deleteCard}
                                            >
                                                <div className={style.save}>Delete</div>
                                            </Button>
                                        </tr>
                                    }
                                    onClose={onCloseDelete}
                                />
                            )}

                            {updatingCardId === card._id && (
                                <Modal
                                    title={"Edit Card"}
                                    content={
                                        <>
                                            <TextField style={{width: "100%"}} value={question}
                                                       onChange={createQuestion} label="Question"/>
                                            <TextField style={{width: "100%"}} value={answer} onChange={createAnswer}
                                                       label="Answer"/>
                                        </>
                                    }
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
                                                onClick={updateCard}
                                            >
                                                <div className={style.save}>Save</div>
                                            </Button>
                                        </tr>
                                    }
                                    onClose={onCloseUpdate}
                                />
                            )}

                            <tr className={style.tr} key={card._id}>
                                <td className={style.td}>{card.question}</td>
                                <td className={style.td}>{card.answer}</td>
                                <td className={style.td}>{card.updated}</td>
                                <td className={style.td}>{card.grade}</td>
                                {
                                    userId === profile._id &&
                                    <td className={style.td}>
                                        <SuperSmallButton onClick={() => setDeletedCardId(card._id)} text={"Delete"}
                                                          option={"red"}/>
                                        <SuperSmallButton onClick={() => setUpdatingCardId(card._id)} text={"Edit"}/>
                                    </td>
                                }
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