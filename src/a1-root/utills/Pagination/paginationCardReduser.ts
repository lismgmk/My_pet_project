import {CardResponseType} from "../../../api/card-api/cardAPI";
import {CommonActionTypeForApp, InferActionType} from "../../../app/store";


const initialState = {
    cardsTotalCount: 0,
    page: 1,
    pageCount: 3
} as CardResponseType;

export const paginationCardReduser =
    (state: InitialPaginationStateType = initialState, action: CommonActionTypeForApp): InitialPaginationStateType => {
        switch (action.type) {
            case "PET-PROJECT/ROOT/PAGINATION/SET-CARD-TOTAL-COUNT":
                return {...state, cardsTotalCount: action.pack}
            case "PET-PROJECT/ROOT/PAGINATION/SET-CARD-PAGE":
                return {...state, page: action.pack}
            case "PET-PROJECT/ROOT/PAGINATION/SET-CARD-PAGE-COUNT":
                return {...state, pageCount: action.pack}
            default:
                return state;
        }
    };

// actions
export const actionsForCardPagination = {

    setCardTotalCount: (pack: number) => ({
        type: "PET-PROJECT/ROOT/PAGINATION/SET-CARD-TOTAL-COUNT",
        pack
    } as const),
    setCardPage: (pack: number) => ({
        type: "PET-PROJECT/ROOT/PAGINATION/SET-CARD-PAGE",
        pack
    } as const),
    setCardPageCount: (pack: number) => ({
        type: "PET-PROJECT/ROOT/PAGINATION/SET-CARD-PAGE-COUNT",
        pack
    } as const)

};



// types
export type InitialPaginationStateType = typeof initialState;
export type PaginationActionCardType = InferActionType<typeof actionsForCardPagination>;

