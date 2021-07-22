import {instance} from "./a1-instance";

export const getPacksAPI = {
    async getPacks(userId: string) {
        const response = await instance.get<GetDataType>(
            `/cards/pack`,
            {
                params: {
                    userId,
                    pageCount: 1000,
                    page: 5,
                    packName: "friday",
                    min: 1,
                    max: 10,
                    sortPacks: 0 + "updated"
                }
            }
        )
        return response
    }
}

export type PackType = {
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

export type GetDataType = {
    cardPacks: PackType[]
    error: string
}