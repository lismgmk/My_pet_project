import {InferActionType} from "../../../app/store";


export let sortValue = '0updated' || '1updated' as const

const initialState = {
    myPackState: false,
    sortState: false,
    dateState: false,
    minRange: 1,
    maxRange: 200,
    sortValue: '0updated'
} as initialStateType;

export const StateOfMyPackSortDateReduser =
    (state: StateOfMyPackSortDateType = initialState, action: StateOfMyPackSortDateActionType): StateOfMyPackSortDateType => {
        switch (action.type) {
            case "PET-PROJECT/ROOT/UTILLS/STATE-OF-MYPACK-SORT-DATA/MYPACK":
                return {...state, myPackState : action.flag}
                case "PET-PROJECT/ROOT/UTILLS/STATE-OF-MYPACK-SORT-DATA/SORT":
                return {...state, sortState : action.flag}
                case "PET-PROJECT/ROOT/UTILLS/STATE-OF-MYPACK-SORT-DATA/DATA":
                return {...state, dateState : action.flag}
                case "PET-PROJECT/ROOT/UTILLS/STATE-OF-MYPACK-SORT-DATA/SORT-VALUE":
                return {...state, sortValue : action.value}
                case "PET-PROJECT/ROOT/UTILLS/STATE-OF-MYPACK-SORT-DATA/MIN-RANGE":
                return {...state, minRange : action.value}
                case "PET-PROJECT/ROOT/UTILLS/STATE-OF-MYPACK-SORT-DATA/MAX-RANGE":
                return {...state, maxRange : action.value}
            default:
                return state;
        }
    };


// actions
export const actionsForStateOfMyPackSortDate = {

    setFlagMyPack: (flag: boolean) => ({
        type: "PET-PROJECT/ROOT/UTILLS/STATE-OF-MYPACK-SORT-DATA/MYPACK",
        flag
    } as const),
    setFlagSort: (flag: boolean) => ({
        type: "PET-PROJECT/ROOT/UTILLS/STATE-OF-MYPACK-SORT-DATA/SORT",
        flag
    } as const),
    setFlagData: (flag: boolean) => ({
        type: "PET-PROJECT/ROOT/UTILLS/STATE-OF-MYPACK-SORT-DATA/DATA",
        flag
    } as const),
    setSortValue: (value: typeof sortValue) => ({
        type: "PET-PROJECT/ROOT/UTILLS/STATE-OF-MYPACK-SORT-DATA/SORT-VALUE",
        value
    } as const),
    setMinRange: (value: number) => ({
        type: "PET-PROJECT/ROOT/UTILLS/STATE-OF-MYPACK-SORT-DATA/MIN-RANGE",
        value
    } as const),
    setMaxRange: (value: number) => ({
        type: "PET-PROJECT/ROOT/UTILLS/STATE-OF-MYPACK-SORT-DATA/MAX-RANGE",
        value
    } as const),



};



// types
type initialStateType = {
    myPackState: boolean
    sortState: boolean
    dateState: boolean
    minRange: number
    maxRange: number
    sortValue: typeof sortValue
}
export type StateOfMyPackSortDateType = initialStateType;
export type StateOfMyPackSortDateActionType = InferActionType<typeof actionsForStateOfMyPackSortDate>;

