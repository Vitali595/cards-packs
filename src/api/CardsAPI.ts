import {instance} from "./a1-instance";

export const CardsAPI = {
    async getCards(cardsPack_id?: string, maxGrade?: number, minGrade?: number, page?: number,
                   pageCount?: number,  searchCardQuestion?: string, sortCards?: string) {
        const response = await instance.get(
            'cards/card',
            {
                params: {
                    cardsPack_id,
                    max: maxGrade,
                    min: minGrade,
                    page,
                    pageCount,
                    sortCards,
                    cardQuestion: searchCardQuestion
                }
            }
        )
        return response
    },
    async createNewCard(cardsPack_id: string, question?: string, answer?: string) {
        const response = await instance.post(
            'cards/card',
            {card: {cardsPack_id: cardsPack_id, question: question, answer: answer}}
        )
        return response
    },
    async deleteCard(id: string) {
        const response = await instance.delete(
            'cards/card',
            {params: {id}}
        )
        return response
    },
    async updateCard(_id: string, question?: string, answer?: string) {
        const response = await instance.put(
            'cards/card',
            {card: {_id: _id, question: question, answer: answer}}
        )
        return response
    }
}

export type ResponseCardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
    comment: string
    more_id: string
}