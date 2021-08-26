import {CommonActionTypeForApp, InferActionType} from "../../app/store";
import {forgotAPI, ForgotType} from "../../api/forgot-api/forgotAPI";
import {ThunkDispatchType, ThunkType} from "../../app/appReducer";

const initialState = {
    forgotPasswordError: '',
    status: 'idle'
} as forgotPasswordType

export const forgotPasswordReduser =
    (state: forgotPasswordType = initialState, action: CommonActionTypeForApp): forgotPasswordType => {
        switch (action.type) {
            case "PET-PROJECT/ROOT/FORGOT-PASSWORD/FORGOT-ERROR":
                return {...state, forgotPasswordError: action.value};
                case "PET-PROJECT/ROOT/FORGOT-PASSWORD/FORGOT-STATUS":
                return {...state, status: action.value};
            default:
                return state;
        }
    };


// actions
export const actionsForPassword = {
    forgotPasswordError: (value: string) => ({type: "PET-PROJECT/ROOT/FORGOT-PASSWORD/FORGOT-ERROR", value} as const),
    forgotStatus: (value: forgotStatusType) => ({type: "PET-PROJECT/ROOT/FORGOT-PASSWORD/FORGOT-STATUS", value} as const),
};


// thunks
export const forgotPassword = (data: ForgotType): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(actionsForPassword.forgotStatus("loading"));
        let res = await forgotAPI.forgot(data);
        if (res.status === 200) {
            dispatch(actionsForPassword.forgotStatus("succeeded"));
        }
    } catch (e) {
        dispatch(actionsForPassword.forgotStatus("failed"));
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log(error)
        dispatch(actionsForPassword.forgotPasswordError(error))
    }
};

// types
export type forgotPasswordType =  {
    forgotPasswordError: string
    status: forgotStatusType
}
export type ActionsForFogotPasswordType = InferActionType<typeof actionsForPassword>;
export type forgotStatusType = "idle" | "loading" | "succeeded" | "failed";