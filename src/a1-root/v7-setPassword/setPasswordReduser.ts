import {CommonActionTypeForApp, InferActionType} from "../../app/store";
import {forgotAPI, SetType} from "../../api/forgot-api/forgotAPI";
import {actionsForApp, ThunkDispatchType, ThunkType} from "../../app/appReducer";

const initialState = {
    status: 'idle'
} as setPasswordType;

export const setPasswordReduser =
    (state: setPasswordType = initialState, action: CommonActionTypeForApp): setPasswordType => {
        switch (action.type) {
            case "PET-PROJECT/ROOT/SET-PASSWORD/SET-STATUS":
                return {...state, status: action.value};
            default:
                return state;
        }
    };


// actions
export const actionsForSetPassword = {
    setStatus: (value: setStatusType) => ({type: "PET-PROJECT/ROOT/SET-PASSWORD/SET-STATUS", value} as const),
};


// thunks
export const getPassword = (data: SetType): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(actionsForSetPassword.setStatus("loading"));
        let res = await forgotAPI.setNewPassword(data);
        dispatch(actionsForSetPassword.setStatus("succeeded"));
    } catch (e: any) {
        dispatch(actionsForSetPassword.setStatus("failed"));
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(actionsForApp.setAppError(error))
    }
};


// types
export type setPasswordType = {
    status: setStatusType
};
export type ActionsForSetPasswordType = InferActionType<typeof actionsForSetPassword>;
export type setStatusType = "idle" | "loading" | "succeeded" | "failed";