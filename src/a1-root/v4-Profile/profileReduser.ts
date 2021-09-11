import {AppRootStateType, CommonActionTypeForApp, InferActionType} from "../../app/store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {StatusType} from "../../app/appReducer";

const initialState = {
    status: "idle",
    error: null
} as const;


export const profileReduser =
    (state: ProfileInitialStateType = initialState, action: ProfileActionType): ProfileInitialStateType => {
        switch (action.type) {
            case "PET-PROJECT/ROOT/PROFILE/SET-STATUS":
                return {...state, status: action.status};
            case "PET-PROJECT/ROOT/PROFILE/SET-ERROR":
                return {...state, error: action.error};
            default:
                return state;
        }
    }


// actions
export const actionsForProfile = {
    setProfileStatus: (status: StatusType) => ({type: "PET-PROJECT/ROOT/PROFILE/SET-STATUS", status} as const),
    setProfileError: (error: string | null) => ({type: "PET-PROJECT/ROOT/PROFILE/SET-ERROR", error} as const),
};


// thunks
export const profileThunk = (): ThunkType => async (dispatch: ThunkDispatchType) => {

};


// types
export type ProfileActionType = InferActionType<typeof actionsForProfile>;
export type ProfileInitialStateType = {
    status: StatusType
    error: string | null
};
export type ThunkType = ThunkAction<void, AppRootStateType, unknown, ProfileActionType>;
export type ThunkDispatchType = ThunkDispatch<AppRootStateType, unknown, ProfileActionType>;

