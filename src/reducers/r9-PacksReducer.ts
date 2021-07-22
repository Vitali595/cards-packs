import {Dispatch} from "redux";
import {PacksAPI, ResponsePackType} from "../api/PacksAPI";
import {setErrorMessageAC} from "./r6-ErrorReducer";

const InitialState = {
    cardPacks: [] as Array<ResponsePackType>,
    cardPacksTotalCount: 2,
    maxCardsCount: 1000 as number | undefined,
    minCardsCount: 0 as number | undefined,
    page: 1 as number | undefined,
    pageCount: 4 as number | undefined,
    searchPackName: "" as string | undefined,
    sortPacks: "" as string | undefined
}

type InitialStateType = typeof InitialState

export const PacksReducer = (state: InitialStateType = InitialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "PACKS/SET-PACKS-LIST":
            return {
                ...state,
                cardPacks: [...action.data.cardPacks],
                cardPacksTotalCount: action.data.cardPacksTotalCount
            }
        case "PACKS/SET-ADDITIONAL-DATA":
            return {
                ...state,
                maxCardsCount: action.maxCardsCount,
                minCardsCount: action.minCardsCount,
                page: action.page,
                pageCount: action.pageCount,
                searchPackName: action.searchPackName,
                sortPacks: action.sortPacks
            }
        default:
            return state
    }
}

export const setPacksListAC = (data: InitialStateType) => ({type: "PACKS/SET-PACKS-LIST", data} as const)
const setAdditionalDataAC = (pageCount?: number, page?: number, searchPackName?: string, minCardsCount?: number,
                             maxCardsCount?: number, sortPacks?: string) => ({
    type: "PACKS/SET-ADDITIONAL-DATA",
    pageCount,
    page,
    searchPackName,
    minCardsCount,
    maxCardsCount,
    sortPacks
} as const)

export type SetPacksListAT = ReturnType<typeof setPacksListAC>
export type SetAdditionalDataAT = ReturnType<typeof setAdditionalDataAC>

type ActionType = SetPacksListAT  | SetAdditionalDataAT

export const setPacksListTC = (userId?: string, pageCount?: number, page?: number,
                               searchPackName?: string, minCardsCount?: number, maxCardsCount?: number,
                               sortPacks?: string) =>
    (dispatch: Dispatch) => {
        PacksAPI.getPacks(userId, pageCount, page, searchPackName, minCardsCount, maxCardsCount, sortPacks)
            .then(res => {
                dispatch(setPacksListAC(res.data))
                dispatch(setAdditionalDataAC(pageCount, page, searchPackName, minCardsCount, maxCardsCount, sortPacks))
            })
            .catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(setErrorMessageAC(error))
            })
    }

export const createNewCardPackTC = (userId: string, title: string, pageCount?: number, page?: number,
                                    searchPackName?: string, minCardsCount?: number, maxCardsCount?: number,
                                    sortPacks?: string) =>
    (dispatch: any) => {
        PacksAPI.createCardPack(title)
            .then(res => {
                dispatch(setPacksListTC(userId, pageCount, page, searchPackName, minCardsCount, maxCardsCount, sortPacks))
            })
    }
export const deleteCardPackTC = (id: string, userId: string, pageCount?: number, page?: number,
                                 searchPackName?: string, minCardsCount?: number, maxCardsCount?: number,
                                 sortPacks?: string) =>
    (dispatch: any) => {
        PacksAPI.deleteCardPack(id)
            .then(res => {
                dispatch(setPacksListTC(userId, pageCount, page, searchPackName, minCardsCount, maxCardsCount, sortPacks))
            })
    }
export const updateCardPackTC = (userId: string, id: string, title: string, pageCount?: number, page?: number,
                                 searchPackName?: string, minCardsCount?: number, maxCardsCount?: number,
                                 sortPacks?: string) =>
    (dispatch: any) => {
        PacksAPI.updateCardPack(id, title)
            .then(res => {
                dispatch(setPacksListTC(userId, pageCount, page, searchPackName, minCardsCount, maxCardsCount, sortPacks))
            })
    }
