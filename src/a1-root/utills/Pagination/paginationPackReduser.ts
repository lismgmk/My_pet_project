import {ResponseCardsPackType} from "../../../api/pack-api/packAPI";
import {CommonActionTypeForApp, InferActionType} from "../../../app/store";



const initialState = {
    pageCount: 5,
    page: 1,
    cardPacksTotalCount: 10
} as ResponseCardsPackType;

export const paginationPackReducer =
    (state: InitialPaginationStateType = initialState, action: CommonActionTypeForApp): InitialPaginationStateType => {
        switch (action.type) {
            case "PET-PROJECT/ROOT/PAGINATION/SET-PACK-TOTAL-COUNT":
                return {...state, cardPacksTotalCount: action.pack}
            case "PET-PROJECT/ROOT/PAGINATION/SET-PACK-PAGE":
                return {...state, page: action.pack}
            case "PET-PROJECT/ROOT/PAGINATION/SET-PACK-PAGE-COUNT":
                return {...state, pageCount: action.pack}
            default:
                return state;
        }
    };


// actions
export const actionsForPackPagination = {

    setPackTotalCount: (pack: number) => ({
        type: "PET-PROJECT/ROOT/PAGINATION/SET-PACK-TOTAL-COUNT",
        pack
    } as const),
    setPackPage: (pack: number) => ({
        type: "PET-PROJECT/ROOT/PAGINATION/SET-PACK-PAGE",
        pack
    } as const),
    setPackPageCount: (pack: number) => ({
        type: "PET-PROJECT/ROOT/PAGINATION/SET-PACK-PAGE-COUNT",
        pack
    } as const)

};



// types
export type InitialPaginationStateType = typeof initialState;
export type PaginationActionPackType = InferActionType<typeof actionsForPackPagination>;

