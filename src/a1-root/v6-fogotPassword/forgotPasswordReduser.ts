import {AppRootStateType, CommonActionTypeForApp, InferActionType} from "../../app/store";
import {forgotAPI, ForgotType, SetType} from "../../api/forgot-api/forgotAPI";
import {ThunkAction} from "redux-thunk";
import {actionsForApp, ThunkDispatchType, ThunkType} from "../../app/appReducer";



const initialState = {
    isSendEmail: false,
    isGetPassworword: false
};


export const forgotPasswordReduser =
    (state: forgotPasswordType = initialState, action: CommonActionTypeForApp): forgotPasswordType => {
        switch (action.type) {
            case "PET-PROJECT/ROOT/FORGOT-PASSWORD/FORGOT-PASSWORD":
                return {...state, isSendEmail: action.value};
                case "PET-PROJECT/ROOT/FORGOT-PASSWORD/GET-PASSWORD":
                return {...state, isGetPassworword: action.value};
            default:
                return state;
        }
    };


// actions
export const actionsForPassword = {
    forgotPassword: (value: boolean) => ({type: "PET-PROJECT/ROOT/FORGOT-PASSWORD/FORGOT-PASSWORD", value} as const),
    getPassword: (value: boolean) => ({type: "PET-PROJECT/ROOT/FORGOT-PASSWORD/GET-PASSWORD", value} as const),

};


// thunks
export const forgotPassword = (data: ForgotType): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(actionsForApp.setAppStatus("loading"));
        let res = await forgotAPI.forgot(data);
        if (res.status === 200) {
            dispatch(actionsForApp.setAppStatus("succeeded"));
           dispatch(actionsForPassword.forgotPassword(true))
        }
    } catch (e) {
        dispatch(actionsForApp.setAppStatus("failed"));
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(actionsForApp.setAppError(error))
    }
};

export const getPassword = (data: SetType): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(actionsForApp.setAppStatus("loading"));
        let res = await forgotAPI.forgot(data);
        if (res.status === 200) {
            dispatch(actionsForApp.setAppStatus("succeeded"));
           dispatch(actionsForPassword.forgotPassword(true))
        }
    } catch (e) {
        dispatch(actionsForApp.setAppStatus("failed"));
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(actionsForApp.setAppError(error))
    }
};


// types
export type forgotPasswordType = typeof initialState;
export type ActionsForLoginType = InferActionType<typeof actionsForPassword>;
