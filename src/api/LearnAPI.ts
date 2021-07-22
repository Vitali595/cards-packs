import {instance} from "./a1-instance";

export const LearnAPI = {
    async sendUpdatedGrade(grade: number, card_id: string) {
        const response = await instance.put(
            '/cards/grade',
            {grade, card_id}
        )
        return response
    }
}

export type ResponseLearnType = {
    updatedGrade: {
        _id: string,
        cardsPack_id: string,
        card_id: string,
        user_id: string,
        grade: number,
        shots: number
    }
}
