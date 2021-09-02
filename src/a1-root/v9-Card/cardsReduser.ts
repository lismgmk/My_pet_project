import {actionsForApp, ThunkDispatchType, ThunkType} from "../../app/appReducer";
import {AppRootStateType, CommonActionTypeForApp, InferActionType} from "../../app/store";
import {
    cardAPI,
    CardType,
    NewlyCreatedCardType,
    RequestGetCardType,
    UpdatedCardDataType
} from "../../api/card-api/cardAPI";
import {handleError} from "../utills/error-utils/ErrorUtils";
import {actionsForCardPagination} from "../common/Pagination/paginationCardReduser";


const initialState = {} as CardsStateType;

export const cardsReducer =
    (state: InitialCardsStateType = initialState, action: CommonActionTypeForApp): InitialCardsStateType => {
        switch (action.type) {
            case "PET-PROJECT/ROOT/CARD/REMOVE-CARD":
                return {...state, [action.packId]: state[action.packId].filter(c => c._id !== action.cardId)};
            case "PET-PROJECT/ROOT/CARD/UPDATE-CARD":
                return {
                    ...state,
                    [action.packId]: state[action.packId]
                        .map(c => c._id === action.cardId ? {...c, ...action.model} : c)
                };
            case "PET-PROJECT/ROOT/CARD/SET-CARDS":
                return {...state, [action.packId]: action.cards.map(c => ({...c, firstProperty: 1, secondProperty: 2}))};
            case "PET-PROJECT/ROOT/PACK/CREATE-PACK":
                return {...state, [action.pack._id]: []};
            case "PET-PROJECT/ROOT/PACK/REMOVE-PACK":
                const stateCopy = {...state};
                delete stateCopy[action.id];
                return stateCopy;
            case "PET-PROJECT/ROOT/PACK/SET-PACK-LISTS": {
                const copyState = {...state};
                action.pack.forEach((p) => {
                    copyState[p._id] = [];
                });
                return copyState;
            }
            case "PET-PROJECT/ROOT/PACK/CLEAR-DATA":
                return initialState;
            case "PET-PROJECT/ROOT/CARD/UPDATE-CARD-FIRST-PROPERTY":
                return {
                    ...state,
                    [action.packId]: state[action.packId]
                        .map(c => c._id === action.cardId
                            ? {...c, firstProperty: action.first}
                            : c)
                };
            case "PET-PROJECT/ROOT/CARD/UPDATE-CARD-SECOND-PROPERTY":
                return {
                    ...state,
                    [action.packId]: state[action.packId]
                        .map(c => c._id === action.cardId
                            ? {...c, secondProperty: action.second}
                            : c)
                };
            default:
                return state;
        }
    };


// actions
export const actionsForCards = {
    removeCard: (packId: string, cardId: string) => ({
        type: "PET-PROJECT/ROOT/CARD/REMOVE-CARD",
        packId,
        cardId,
    } as const),
    updateCard: (packId: string, cardId: string, model: UpdateCardModelType) => ({
        type: "PET-PROJECT/ROOT/CARD/UPDATE-CARD",
        packId,
        cardId,
        model,
    } as const),
    setCards: (packId: string, cards: CardType[]) => ({
        type: "PET-PROJECT/ROOT/CARD/SET-CARDS",
        packId,
        cards,
    } as const),
    updateCardFirstProperty: (packId: string, cardId: string, first: any) => ({
        type: "PET-PROJECT/ROOT/CARD/UPDATE-CARD-FIRST-PROPERTY",
        packId,
        cardId,
        first,
    } as const),
    updateCardSecondProperty: (packId: string, cardId: string, second: any) => ({
        type: "PET-PROJECT/ROOT/CARD/UPDATE-CARD-SECOND-PROPERTY",
        packId,
        cardId,
        second,
    } as const),
};


// thunks
export const fetchCard = (data: RequestGetCardType): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(actionsForApp.setAppStatus("loading"));
        let res = await cardAPI.getCard(data);
        dispatch(actionsForCards.setCards(data.cardsPack_id, res.data.cards));
        dispatch(actionsForCardPagination.setCardTotalCount(res.data.cardsTotalCount));
        dispatch(actionsForCardPagination.setCardPage(res.data.page));
        dispatch(actionsForCardPagination.setCardPageCount(res.data.pageCount));
        dispatch(actionsForApp.setAppStatus("succeeded"));
    } catch(e: any) {
        handleError(e, dispatch);
    }
};

export const removeCard = (packId: string, cardId: string): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(actionsForApp.setAppStatus("loading"));
        await cardAPI.removeCard(cardId);
        dispatch(actionsForCards.removeCard(packId, cardId));
        dispatch(actionsForApp.setAppStatus("idle"));
    } catch(e: any) {
        handleError(e, dispatch);
    }
};

export const createCard = (dataForNewCard: NewlyCreatedCardType, dataForRequest: RequestGetCardType)
        : ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(actionsForApp.setAppStatus("loading"));
        await cardAPI.createCard(dataForNewCard);
        let res = await cardAPI.getCard(dataForRequest);
        dispatch(actionsForCards.setCards(dataForRequest.cardsPack_id, res.data.cards));
        dispatch(actionsForApp.setAppStatus("succeeded"));
    } catch(e: any) {
        handleError(e, dispatch);
    }
};

export const updateCard = (packId: string, cardId: string, domainModel: UpdateCardModelType): ThunkType =>
    async (dispatch: ThunkDispatchType, getState: () => AppRootStateType) => {
        try {
            dispatch(actionsForApp.setAppStatus("loading"));
            const card = getState().cards[packId].find(c => c._id === cardId);
            if (!card) {
                console.warn("task not found in the state");
                dispatch(actionsForApp.setAppStatus("failed"));
                return;
            }
            const apiModel: UpdatedCardDataType = {
                _id: card._id,
                question: card.question,
                comments: card.comments,
                ...domainModel,
            };
            await  cardAPI.updateCardData(apiModel);
            dispatch(actionsForCards.updateCard(packId, cardId, apiModel));
            dispatch(actionsForApp.setAppStatus("idle"));
        } catch(e: any) {
            handleError(e, dispatch);
        }
    };


// types
export type InitialCardsStateType = typeof initialState;
export type CardsActionType = InferActionType<typeof actionsForCards>;

export type CardDomainType = CardType & {
    firstProperty: any
    secondProperty: any
};
export type CardsStateType = {
    [key: string]: CardDomainType[]
};
export type UpdateCardModelType = {
    question?: any
    comments?: any
};

