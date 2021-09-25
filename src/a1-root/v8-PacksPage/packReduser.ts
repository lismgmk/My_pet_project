import {InferActionType} from "../../app/store";
import {actionsForApp, StatusType, ThunkDispatchType, ThunkType} from "../../app/appReducer";
import {
    CardsPackType,
    NewCardsPackType,
    packAPI,
    RequestGetCardsPackType,
    UpdatedPackDataType
} from "../../api/pack-api/packAPI";
import {actionsForPackPagination} from "../common/Pagination/paginationPackReduser";
import {Dispatch} from "redux";


const initialState = {
    status: "idle",
    error: null,
    pack: []
} as InitialPackStateType


export const packReducer =
    (state: InitialPackStateType = initialState, action: PackActionType): InitialPackStateType => {
        switch (action.type) {
            case "PET-PROJECT/ROOT/PACK/REMOVE-PACK":
                    return {...state,
                        pack: state.pack.filter(p => p._id !== action.id)
                    }

            case "PET-PROJECT/ROOT/PACK/CREATE-PACK":
                return {
                    ...state,
                    pack: [...state.pack, {...action.pack, firstProperty: 1, secondProperty: 2}]
                }
            case "PET-PROJECT/ROOT/PACK/UPDATE-PACK-TITLE":
                return { ...state,
                    pack: state.pack.map(p => p._id === action.id ? {...p, title: action.title} : p)
                }
            case "PET-PROJECT/ROOT/PACK/SET-PACK-LISTS":
                return { ...state,
                    pack: action.pack.map((p) => ({...p, firstProperty: 1, secondProperty: 2}))}
            case "PET-PROJECT/ROOT/PACK/UPDATE-PACK-FIRST-PROPERTY":
                return {...state,
                 pack: state.pack.map(p => p._id === action.id ? {...p, firstProperty: action.first} : p)
                }
            case "PET-PROJECT/ROOT/PACK/UPDATE-PACK-SECOND-PROPERTY":
                return {...state,
                    pack: state.pack.map(p => p._id === action.id ? {...p, secondProperty: action.second} : p)
                }
            case "PET-PROJECT/ROOT/PACK/CLEAR-DATA":
                return initialState;
            case "PET-PROJECT/ROOT/PACK/STATUS":
                return {...state, status: action.status};
            case "PET-PROJECT/ROOT/PACK/ERROR":
                return {...state, error: action.error};
            default:
                return state;
        }
    };


// actions
export const actionsForPack = {
    removePack: (id: string) => ({
        type: "PET-PROJECT/ROOT/PACK/REMOVE-PACK",
        id,
    } as const),
    createPack: (pack: CardsPackType) => ({
        type: "PET-PROJECT/ROOT/PACK/CREATE-PACK",
        pack,
    } as const),
    updatePackTitle: (id: string, title?: string) => ({
        type: "PET-PROJECT/ROOT/PACK/UPDATE-PACK-TITLE",
        id,
        title,
    } as const),
    setPackLists: (pack: CardsPackType[]) => ({
        type: "PET-PROJECT/ROOT/PACK/SET-PACK-LISTS",
        pack
    } as const),
    updatePackFirstProperty: (id: string, first: any) => ({
        type: "PET-PROJECT/ROOT/PACK/UPDATE-PACK-FIRST-PROPERTY",
        id,
        first,
    } as const),
    updatePackSecondProperty: (id: string, second: any) => ({
        type: "PET-PROJECT/ROOT/PACK/UPDATE-PACK-SECOND-PROPERTY",
        id,
        second,
    } as const),
    clearData: () => ({
        type: "PET-PROJECT/ROOT/PACK/CLEAR-DATA"
    } as const),
    packStatus: (status: StatusType) => ({
        type: "PET-PROJECT/ROOT/PACK/STATUS", status
    } as const),
    packError: (error: string | null) => ({
        type: "PET-PROJECT/ROOT/PACK/ERROR", error
    } as const),

};


// thunks
export const fetchPack = (data: RequestGetCardsPackType) => async (dispatch: Dispatch) => {
    try {
        dispatch(actionsForPack.packStatus("loading"));
        let res = await packAPI.getCardsPack(data);
        dispatch(actionsForPack.setPackLists(res.data.cardPacks));
        dispatch(actionsForPackPagination.setPackTotalCount(res.data.cardPacksTotalCount))
        dispatch(actionsForPack.packStatus("succeeded"));
    } catch (e: any) {
        dispatch(actionsForPack.packStatus("succeeded"));
        const error = e.response.data.error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\'
            ? null
            : e.response.data.error
                ? e.response.data.error
                : (e.message + ', more details in the console');
        dispatch(actionsForPack.packError(error));
    }
};

export const removePack = (packId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(actionsForPack.packStatus("loading"));
        await packAPI.removeCardsPack(packId);
        dispatch(actionsForPack.removePack(packId));
        dispatch(actionsForPack.packStatus("succeeded"));
    } catch (e: any) {
        const error = e.response.data.error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\'
            ? null
            : e.response.data.error
                ? e.response.data.error
                : (e.message + ', more details in the console');
        dispatch(actionsForPack.packError(error));
    }
};

export const createPack = (dataForNewPack: NewCardsPackType, dataForRequest: RequestGetCardsPackType) =>
    async (dispatch: Dispatch) => {
    try {
        dispatch(actionsForPack.packStatus("loading"));
        await packAPI.createNewCardsPack(dataForNewPack);
        let res = await packAPI.getCardsPack(dataForRequest);
        dispatch(actionsForPack.setPackLists(res.data.cardPacks));
        dispatch(actionsForPack.packStatus("succeeded"));
    } catch (e: any) {
        const error = e.response.data.error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\'
            ? null
            : e.response.data.error
                ? e.response.data.error
                : (e.message + ', more details in the console');
        dispatch(actionsForPack.packError(error));
    }
};

export const updatePackTitle = (data: UpdatedPackDataType): ThunkType =>
    async (dispatch: ThunkDispatchType) => {
        try {
            dispatch(actionsForPack.packStatus("loading"));
            await packAPI.updateCardsPackData(data);
            dispatch(actionsForPack.updatePackTitle(data._id, data.name));
            dispatch(actionsForPack.packStatus("succeeded"));
        } catch (e: any) {
            const error = e.response.data.error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\'
                ? null
                : e.response.data.error
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
            dispatch(actionsForPack.packError(error));
        }
    };


// types
export type PackActionType = InferActionType<typeof actionsForPack>;

export type InitialPackStateType = {
    status: StatusType
    error: string | null
    pack:  Array<PackDomainType>
};

export type PackDomainType = CardsPackType & {
    firstProperty: any
    secondProperty: any

};