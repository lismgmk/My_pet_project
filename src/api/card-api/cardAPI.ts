import {instance} from "../login-api/loginAPI";


// api
export const cardAPI = {
    createCard(data: NewlyCreatedCardType) {
        return instance.post<{}>("cards/card", {data});
    },
    removeCard(id: string) {
        return instance.delete<{}>("cards/card", {params: {id}});
    },
    updateCardData(data: UpdatedCardDataType) {
        return instance.put<{}>("cards/card", {
            _id: data._id,
            question: data.question,
            comments: data.comments
        });
    },
    getCard(data: RequestGetCardType) {
        return instance.get<CardResponseType>("cards/card", {params: {
                cardAnswer: data.cardAnswer,
                cardQuestion: data.cardQuestion,
                cardsPack_id: data.cardsPack_id,
                min: data.min,
                max: data.max,
                sortCards: data.sortCards,
                page: data.page,
                pageCount: data.pageCount,
            }});
    },
};


// types
type NewlyCreatedCardType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type: string
};
type UpdatedCardDataType = {
    _id: string
    question?: string
    comments?: string
};
type RequestGetCardType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: string
    max?: string
    sortCards?: string
    page?: string
    pageCount?: string
};
type CardType = {
    _id: string
    user_id: string
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number
    rating: number
    type: "pack" | "folder"
    created: string
    updated: string
    __v: number
};
type CardResponseType = {
    cardPacks: CardType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
};



