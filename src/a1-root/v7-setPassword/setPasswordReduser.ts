import {CommonActionTypeForApp, InferActionType} from "../../app/store";
import {forgotAPI, SetType} from "../../api/forgot-api/forgotAPI";
import {actionsForApp, ThunkDispatchType, ThunkType} from "../../app/appReducer";

const initialState = {
    setPasswordError: '',
    status: 'idle'
} as setPasswordType;

export const setPasswordReduser =
    (state: setPasswordType = initialState, action: CommonActionTypeForApp): setPasswordType => {
        switch (action.type) {
            case "PET-PROJECT/ROOT/SET-PASSWORD/SET-ERROR":
                return {...state, setPasswordError: action.value};
                case "PET-PROJECT/ROOT/SET-PASSWORD/SET-STATUS":
                return {...state, status: action.value};
            default:
                return state;
        }
    };


// actions
export const actionsForSetPassword = {
    setPasswordError: (value: string) => ({type: "PET-PROJECT/ROOT/SET-PASSWORD/SET-ERROR", value} as const),
    setStatus: (value: setStatusType) => ({type: "PET-PROJECT/ROOT/SET-PASSWORD/SET-STATUS", value} as const),
};


// thunks

export const getPassword = (data: SetType): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(actionsForApp.setAppStatus("loading"));
        let res = await forgotAPI.setNewPassword(data);
        if (res.status === 200) {
            dispatch(actionsForApp.setAppStatus("succeeded"));
        }
    } catch (e) {
        console.log(e.response)
        dispatch(actionsForApp.setAppStatus("failed"));
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(actionsForSetPassword.setPasswordError(error))
    }
};


// types
export type setPasswordType = {
    setPasswordError: string
    status: setStatusType
};
export type ActionsForSetPasswordType = InferActionType<typeof actionsForSetPassword>;
export type setStatusType = "idle" | "loading" | "succeeded" | "failed";