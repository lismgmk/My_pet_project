import {AppRootStateType, CommonActionTypeForApp, InferActionType} from "./store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {authAPI} from "../api/auth-api/authAPI";


const initialState = {
    status: "loading",
    isLogedIn: false,
    error: ''
} as AppInitialStateType;

export const appReducer =
    (state: InitialAppStateType = initialState, action: CommonActionTypeForApp): InitialAppStateType => {
        switch (action.type) {
            case "PET-PROJECT/ROOT/APP/SET-STATUS":
                return {...state, status: action.status};
            case "PET-PROJECT/ROOT/APP/IS-LOGGEDIN":
                return {...state, isLogedIn: action.isLogedIn};
            case "PET-PROJECT/ROOT/APP/SET-ERROR":
                return {...state, error: action.error};
            default:
                return state;
        }
    };


// actions
export const actionsForApp = {
    setAppStatus: (status: StatusType) => ({type: "PET-PROJECT/ROOT/APP/SET-STATUS", status} as const),
    setAppError: (error: string | null) => ({type: "PET-PROJECT/ROOT/APP/SET-ERROR", error} as const),
    setIsLoggedIn: (isLogedIn: boolean) => ({
        type: "PET-PROJECT/ROOT/APP/IS-LOGGEDIN",
        isLogedIn
    } as const),
};


// thunks
export const initializeApp = (): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(actionsForApp.setAppStatus('loading'))
        await authAPI.me();
        dispatch(actionsForApp.setAppStatus('succeeded'))
    } catch (e: any) {
        dispatch(actionsForApp.setAppStatus("succeeded"));
        const error = e.response.data.error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\'
            ? null
            : e.response.data.error
                ? e.response.data.error
                : (e.message + ', more details in the console');
        dispatch(actionsForApp.setAppError(error));
    }
};


// types
export type InitialAppStateType = typeof initialState;
export type AppActionType = InferActionType<typeof actionsForApp>;
export type AppInitialStateType = {
    status: StatusType
    isLogedIn: boolean
    error: string | null
};
export type StatusType = "idle" | "loading" | "succeeded";
export type ThunkType = ThunkAction<void, AppRootStateType, unknown, CommonActionTypeForApp>;
export type ThunkDispatchType = ThunkDispatch<AppRootStateType, unknown, CommonActionTypeForApp>;

