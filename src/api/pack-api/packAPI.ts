import {instance} from "../login-api/loginAPI";


// api
export const packAPI = {
    createNewCardsPack(data: CardsPackType) {
        return instance.post<{}>("cards/pack", {data});
    },
    removeCardsPack(id: string) {
        return instance.delete<{}>("cards/pack", {params: {id}});
    },
    updateCardsPackData(data: UpdatedPackDataType) {
        return instance.put<{}>("cards/pack", {_id: data._id, name: data.name});
    },
    getCardsPack(data: RequestGetCardsPackType) {
        return instance.get<CardsPackResponseType>("cards/pack", {
            params: {
                packName: data.packName,
                min: data.min,
                max: data.max,
                sortPacks: data.sortPacks,
                page: data.page,
                pageCount: data.pageCount,
                user_id: data.user_id,
            }
        });
    },
};


// types
type CardsPackType = {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: "pack" | "folder"
};
type UpdatedPackDataType = {
    _id: string
    name?: string
};
type RequestGetCardsPackType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
};
type CardsPackResponseType = {
    "_id": string
    "user_id": string
    "user_name": string
    "private": boolean
    "name": string
    "path": string
    "grade": number
    "shots": number
    "cardsCount": number
    "type": "pack" | "folder"
    "rating": number
    "created": string
    "updated": string
    "more_id": string
    "__v": number
};


