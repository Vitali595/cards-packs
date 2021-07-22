import {Dispatch} from "redux";
import {setErrorMessageAC} from "./r6-ErrorReducer";
import {CardsAPI, ResponseCardType} from "../api/CardsAPI";
import {LearnAPI} from "../api/LearnAPI";

const InitialState = {
    cards: [] as ResponseCardType[],
    cardsTotalCount: 2,
    maxGrade: 1000 as number | undefined,
    minGrade: 0 as number | undefined,
    page: 1 as number | undefined,
    pageCount: 4 as number | undefined,
    searchCardQuestion: "" as string | undefined,
    sortCards: "" as string | undefined
}

type InitialStateType = typeof InitialState

export const CardsReducer = (state: InitialStateType = InitialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return {
                ...state,
                cards: action.data.cards,
                cardsTotalCount: action.data.cardsTotalCount
            }
        case "CARDS/SET-ADDITIONAL-DATA":
            return {
                ...state,
                maxGrade: action.maxGrade,
                minGrade: action.minGrade,
                page: action.page,
                pageCount: action.pageCount,
                searchCardQuestion: action.searchCardQuestion,
                sortCards: action.sortCards
            }
        default:
            return state
    }
}

export const setCardsAC = (data: InitialStateType) => ({type: "CARDS/SET-CARDS", data} as const)
const setAdditionalDataAC = (maxGrade?: number, minGrade?: number, page?: number,
                             pageCount?: number, searchCardQuestion?: string, sortCards?: string) => (
    {type: "CARDS/SET-ADDITIONAL-DATA", maxGrade, minGrade, page, pageCount, searchCardQuestion, sortCards} as const)

export type SetCardsAT = ReturnType<typeof setCardsAC>
export type SetAdditionalDataAT = ReturnType<typeof setAdditionalDataAC>

type ActionType = SetCardsAT | SetAdditionalDataAT

export const setCardsTC = (packId?: string | undefined, maxGrade?: number, minGrade?: number,
                           page?: number, pageCount?: number, searchCardQuestion?: string, sortCards?: string) =>
    (dispatch: Dispatch) => {
        CardsAPI.getCards(packId, maxGrade, minGrade, page, pageCount, searchCardQuestion, sortCards)
            .then(res => {
                dispatch(setCardsAC(res.data))
                dispatch(setAdditionalDataAC(maxGrade, minGrade, page, pageCount, searchCardQuestion, sortCards))
            })
            .catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(setErrorMessageAC(error))
            })
    }

export const createNewCardTC = (cardsPack_id: string, question: string, answer: string, maxGrade?: number, minGrade?: number,
                                page?: number, pageCount?: number, searchCardQuestion?: string, sortCards?: string) =>
    (dispatch: any) => {
        CardsAPI.createNewCard(cardsPack_id, question, answer)
            .then(res => {
                dispatch(setCardsTC(cardsPack_id, maxGrade, minGrade, page, pageCount, searchCardQuestion, sortCards))
            })
    }
export const deleteCardTC = (id: string, packId: string, maxGrade?: number, minGrade?: number,
                             page?: number, pageCount?: number, searchCardQuestion?: string, sortCards?: string) =>
    (dispatch: any) => {
        CardsAPI.deleteCard(id)
            .then(res => {
                dispatch(setCardsTC(packId, maxGrade, minGrade, page, pageCount, searchCardQuestion, sortCards))
            })
    }
export const updateCardTC = (id: string, packId: string, question?: string, answer?: string, maxGrade?: number, minGrade?: number,
                             page?: number, pageCount?: number, searchCardQuestion?: string, sortCards?: string) =>
    (dispatch: any) => {
        CardsAPI.updateCard(id, question, answer)
            .then(res => {
                dispatch(setCardsTC(packId, maxGrade, minGrade, page, pageCount, searchCardQuestion, sortCards))
            })
    }

export const sendUpdatedGradeTC = (grade: number, card_id: string, packId: string, maxGrade?: number, minGrade?: number,
                                   page?: number, pageCount?: number, searchCardQuestion?: string, sortCards?: string) =>
    (dispatch: any) => {
        LearnAPI.sendUpdatedGrade(grade, card_id)
            .then(res => {
                dispatch(setCardsTC(packId, maxGrade, minGrade, page, pageCount, searchCardQuestion, sortCards))
            })
    }
