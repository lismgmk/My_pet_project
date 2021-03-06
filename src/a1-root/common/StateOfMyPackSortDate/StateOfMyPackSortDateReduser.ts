import {InferActionType} from "../../../app/store";


export let sortValue = '0updated' || '1updated' as const

const initialState = {
    myPackState: false,
    sortState: false,
    dateState: false,
    valueRange: [1, 7],
    sortValue: '0updated',
    searchFlag: false,
    nameSearch: ''
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
                case "PET-PROJECT/ROOT/UTILLS/STATE-OF-MYPACK-SORT-DATA/NAME":
                return {...state, searchFlag : action.flag}
                case "PET-PROJECT/ROOT/UTILLS/STATE-OF-MYPACK-SORT-DATA/SORT-VALUE":
                return {...state, sortValue : action.value}
                case "PET-PROJECT/ROOT/UTILLS/STATE-OF-MYPACK-SORT-DATA/VAL-RANGE":
                return {...state, valueRange : action.arr}
                case "PET-PROJECT/ROOT/UTILLS/STATE-OF-MYPACK-SORT-DATA/VAL-NAME":
                return {...state, nameSearch : action.value}
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
    setFlagName: (flag: boolean) => ({
        type: "PET-PROJECT/ROOT/UTILLS/STATE-OF-MYPACK-SORT-DATA/NAME",
        flag
    } as const),
    setSortValue: (value: typeof sortValue) => ({
        type: "PET-PROJECT/ROOT/UTILLS/STATE-OF-MYPACK-SORT-DATA/SORT-VALUE",
        value
    } as const),
    valueRange: (value: Array<number>) => ({
        type: "PET-PROJECT/ROOT/UTILLS/STATE-OF-MYPACK-SORT-DATA/VAL-RANGE",
        arr: value
    } as const),
    valueName: (value: string) => ({
        type: "PET-PROJECT/ROOT/UTILLS/STATE-OF-MYPACK-SORT-DATA/VAL-NAME",
        value
    } as const)
};



// types
type initialStateType = {
    myPackState: boolean
    sortState: boolean
    dateState: boolean
    valueRange: Array<number>
    sortValue: typeof sortValue
    searchFlag: boolean
    nameSearch: string
}
export type StateOfMyPackSortDateType = initialStateType;
export type StateOfMyPackSortDateActionType = InferActionType<typeof actionsForStateOfMyPackSortDate>;

