import React, {ChangeEvent, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {createNewCardTC, deleteCardTC, setCardsTC, updateCardTC} from "../../reducers/r10-CardsReducer";
import {useParams} from "react-router-dom";
import {ErrorSnackbar} from "../Error/ErrorSnackbar";
import {Modal} from "../ModalWindow/ModalWindow";
import {Paginator} from "../../features/pagination/Paginator";
import {SortElements} from "../../features/SortPacks/SortElements";
import {Search} from "../../features/search/Search";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function Cards() {

    const dispatch = useDispatch()
    const {
        cards, cardsTotalCount, maxGrade, sortCards,
        minGrade, page, pageCount, searchCardQuestion
    } = useSelector((state: AppRootStateType) => state.cards)
    const {cardsPackId} = useParams<{ cardsPackId: string }>()

    useEffect(() => {
        dispatch(setCardsTC(cardsPackId, maxGrade, minGrade, page, pageCount, searchCardQuestion, sortCards))
    }, [dispatch, cardsPackId])

    const classes = useStyles();

    const [isCreate, setCreate] = useState<boolean>(false)
    const [updatingCardId, setUpdatingCardId] = useState("")
    const [deletedCardId, setDeletedCardId] = useState("")
    const [question, setQuestion] = useState<string>("")
    const [answer, setAnswer] = useState<string>("")
    const onClose = () => setCreate(false)
    const onCloseUpdate = () => setUpdatingCardId("")
    const onCloseDelete = () => setDeletedCardId("")

    const addNewCard = () => {
        dispatch(createNewCardTC(cardsPackId, question, answer, maxGrade, minGrade, page, pageCount, searchCardQuestion, sortCards))
        setQuestion("")
        setAnswer("")
        setCreate(false)
    }

    const createQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const createAnswer = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const selectCallback = (value: string) => {
        dispatch(setCardsTC(cardsPackId, maxGrade, minGrade, page, +value, searchCardQuestion, sortCards))
    }

    const searchCallback = (value0: number, value1: number, text: string) => {
        dispatch(setCardsTC(cardsPackId, value1, value0, page, pageCount, text, sortCards))
    }

    const onPageChanged = (pageNumber: number) => {
        dispatch(setCardsTC(cardsPackId, maxGrade, minGrade, pageNumber, pageCount, searchCardQuestion, sortCards))
    }

    const sortHandler1 = (title: string) => {
        dispatch(setCardsTC(cardsPackId, maxGrade, minGrade, page, pageCount, searchCardQuestion, title))
    }

    const sortHandler0 = (title: string) => {
        dispatch(setCardsTC(cardsPackId, maxGrade, minGrade, page, pageCount, searchCardQuestion, title))
    }

    return (
        <>
            {isCreate &&
            <Modal
                title={"Enter the required data"}
                content={
                    <div>
                        {"Enter your question"}
                        <div>
                            <input value={question} onChange={createQuestion}/>
                        </div>
                        {"Enter your answer"}
                        <div>
                            <textarea value={answer} onChange={createAnswer}>{"Enter your answer"}</textarea>
                        </div>
                    </div>
                }

                footer={<tr>
                    <button onClick={addNewCard}>add</button>
                    <button onClick={onClose}>Close</button>
                </tr>}
                onClose={onClose}
            />
            }
            <Search searchCallback={searchCallback}/>
            <div style={{display: "flex", justifyContent: "center"}}>
                <ErrorSnackbar/>
                <TableContainer component={Paper} style={{width: "60%"}}>
                    <Table className={classes.table} size="small" aria-label="a dense table">

                        <TableHead>
                            <TableRow>
                                <TableCell>question</TableCell>
                                <TableCell align="right">answer</TableCell>
                                <TableCell align="right">grade<SortElements sortHandler1={sortHandler1} sortHandler0={sortHandler0} title={"grade"}/></TableCell>
                                <TableCell align="right">updated<SortElements sortHandler1={sortHandler1} sortHandler0={sortHandler0} title={"updated"}/></TableCell>
                                <button onClick={() => setCreate(true)}>add new card</button>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cards.map((card) => {

                                const deleteCard = () => {
                                    dispatch(deleteCardTC(card._id, card.cardsPack_id, maxGrade, minGrade, page, pageCount, searchCardQuestion, sortCards))
                                }
                                const updateCard = () => {
                                    dispatch(updateCardTC(card._id, card.cardsPack_id, question, answer, maxGrade, minGrade, page, pageCount, searchCardQuestion, sortCards))
                                    setQuestion('')
                                    setAnswer('')
                                    setUpdatingCardId('')
                                }
                                return (
                                    <>
                                        {updatingCardId === card._id &&
                                        <Modal
                                            title={"Enter new title"}
                                            content={
                                                <div>
                                                    {"Enter your question"}
                                                    <div>
                                                        <input value={question} onChange={createQuestion}/>
                                                    </div>
                                                    {"Enter your answer"}
                                                    <div>
                                                        <textarea value={answer}
                                                                  onChange={createAnswer}>{"Enter your answer"}</textarea>
                                                    </div>
                                                </div>
                                            }
                                            footer={<tr key={card._id}>
                                                <button onClick={updateCard}>update</button>
                                                <button onClick={onCloseUpdate}>Close</button>
                                            </tr>}
                                            onClose={onCloseUpdate}
                                        />

                                        }
                                        {deletedCardId === card._id &&
                                        <Modal
                                            title={"Do you want delete?"}
                                            content={`Click "yes" if you want`}
                                            footer={<tr key={card._id}>
                                                <button onClick={deleteCard}>Yes</button>
                                                <button onClick={onCloseDelete}>No</button>
                                            </tr>}
                                            onClose={onCloseDelete}
                                        />
                                        }

                                        <TableRow key={card._id}>
                                            <TableCell align="left">{card.question}</TableCell>
                                            <TableCell align="right">{card.answer}</TableCell>
                                            <TableCell align="right">{card.grade}</TableCell>
                                            <TableCell align="right">{card.updated}</TableCell>
                                            <TableCell align="right">
                                            </TableCell>
                                            <TableCell align="right">
                                                <button onClick={() => setUpdatingCardId(card._id)}>update
                                                </button>
                                                <button onClick={() => setDeletedCardId(card._id)}>del
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div>
                <Paginator totalItemsCount={cardsTotalCount} currentPage={page} pageSize={pageCount} onPageChanged={onPageChanged}/>
                <span>
                                <select onChange={(e) => selectCallback(e.currentTarget.value)}>
                                <option>4</option>
                                <option>6</option>
                                <option>8</option>
                                </select>
                                </span>
            </div>
        </>
    );
}