import {instance} from "./a1-instance";

export const PacksAPI = {
    async getPacks(id?: string, pageCount?: number, page?: number, searchPackName?: string, min?: number,
                   max?: number, sortPacks?: string) {
        const response = await instance.get(
            `cards/pack`,
            {
                params: {
                    user_id: id,
                    pageCount,
                    page,
                    packName: searchPackName,
                    min,
                    max,
                    sortPacks
                }
            }
        )
        return response
    },
    async createCardPack(title: string) {
        const response = await instance.post(
            'cards/pack',
            {cardsPack: {name: title}}
        )
        return response
    },
    async deleteCardPack(id: string) {
        const response = await instance.delete(
            'cards/pack',
            {params: {id}}
        )
        return response
    },
    async updateCardPack(id: string, title: string) {
        const response = await instance.put(
            'cards/pack',
            {cardsPack: {_id: id, name: title}}
        )
        return response
    }
}

export type ResponsePackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    deckCover: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
}