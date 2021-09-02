import {CommonActionTypeForApp, InferActionType} from "../../app/store";
import {forgotAPI, ForgotType} from "../../api/forgot-api/forgotAPI";
import {actionsForApp, ThunkDispatchType, ThunkType} from "../../app/appReducer";

const initialState = {
    status: 'idle'
} as forgotPasswordType

export const forgotPasswordReduser =
    (state: forgotPasswordType = initialState, action: CommonActionTypeForApp): forgotPasswordType => {
        switch (action.type) {
            case "PET-PROJECT/ROOT/FORGOT-PASSWORD/FORGOT-STATUS":
                return {...state, status: action.value};
            default:
                return state;
        }
    };


// actions
export const actionsForPassword = {
    forgotStatus: (value: forgotStatusType) => ({
        type: "PET-PROJECT/ROOT/FORGOT-PASSWORD/FORGOT-STATUS",
        value
    } as const),
};


// thunks
export const forgotPassword = (data: ForgotType): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(actionsForPassword.forgotStatus("loading"));
        await forgotAPI.forgot(data);
        dispatch(actionsForPassword.forgotStatus("succeeded"));
    } catch (e: any) {
        dispatch(actionsForPassword.forgotStatus("failed"));
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(actionsForApp.setAppError(error));
    }
};

// types
export type forgotPasswordType = {
    status: forgotStatusType
}
export type ActionsForFogotPasswordType = InferActionType<typeof actionsForPassword>;
export type forgotStatusType = "idle" | "loading" | "succeeded" | "failed";