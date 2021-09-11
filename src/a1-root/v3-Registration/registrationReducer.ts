import {RegisterDataType, registrationAPI} from "../../api/register-api/registrationAPI";
import {actionsForApp, StatusType} from "../../app/appReducer";
import {AppRootStateType, InferActionType} from "../../app/store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {Dispatch} from "redux";


const initialState = {
    status: "idle",
    error: null
} as const;


export const registrationReducer =
    (state: RegistrationInitialStateType = initialState, action: RegisrtationActionType): RegistrationInitialStateType => {
        switch (action.type) {
            case "PET-PROJECT/ROOT/REGISTRATION/SET-STATUS":
                return {...state, status: action.status};
            case "PET-PROJECT/ROOT/REGISTRATION/SET-ERROR":
                return {...state, error: action.error};
            default:
                return state;
        }
    }


// actions
export const actionsForRegistration = {
    setRegistrationStatus: (status: StatusType) => ({type: "PET-PROJECT/ROOT/REGISTRATION/SET-STATUS", status} as const),
    setRegistrationError: (error: string | null) => ({type: "PET-PROJECT/ROOT/REGISTRATION/SET-ERROR", error} as const),
};



//thunk
export const register = (data: RegisterDataType): ThunkType => async (dispatch: Dispatch) => {
    try {
        dispatch(actionsForRegistration.setRegistrationStatus('loading'));
        await registrationAPI.register(data)
        dispatch(actionsForApp.setIsLoggedIn(true));
        dispatch(actionsForRegistration.setRegistrationStatus('succeeded'));
    } catch (e: any) {
        dispatch(actionsForRegistration.setRegistrationError(e.response?.data.error));
        dispatch(actionsForRegistration.setRegistrationStatus('succeeded'));
    }
};


//types
export type RegisrtationActionType = InferActionType<typeof actionsForRegistration>;
export type RegistrationInitialStateType = {
    status: StatusType
    error: string | null
};
export type ThunkType = ThunkAction<void, AppRootStateType, unknown, RegisrtationActionType>;

