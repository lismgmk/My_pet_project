import {loginAPI, LoginResponseType, LoginType, UserDataType} from "../../api/login-api/loginAPI";
import {AppRootStateType, CommonActionTypeForApp, InferActionType} from "../../app/store";
import {authAPI} from "../../api/auth-api/authAPI";
import {actionsForApp, StatusType} from "../../app/appReducer";
import {Dispatch} from "redux";

const initialState = {
    status: "idle",
    error: null,
    user: null
} as const


export const loginReducer =
    (state: InitialLoginStateType = initialState, action: CommonActionTypeForApp): InitialLoginStateType => {
        switch (action.type) {
            case "PET-PROJECT/ROOT/LOGIN/SET-STATUS":
                return {...state, status: action.status};
            case "PET-PROJECT/ROOT/LOGIN/SET-ERROR":
                return {...state, error: action.error};
            case "PET-PROJECT/ROOT/LOGIN/GET-USER":
                return {...state, user: action.data}
            default:
                return state;
        }
    };


// actions
export const actionsForLogin = {
    setStatusLogin: (status: StatusType) => ({type: "PET-PROJECT/ROOT/LOGIN/SET-STATUS", status} as const),
    setError: (error: string) => ({type: "PET-PROJECT/ROOT/LOGIN/SET-ERROR", error} as const),
    getUser: (data: LoginResponseType) => ({type: "PET-PROJECT/ROOT/LOGIN/GET-USER", data} as const),
};


// thunks
export const login = (data: LoginType) => async (dispatch: Dispatch) => {
    try {
        dispatch(actionsForLogin.setStatusLogin("loading"))
        let res = await loginAPI.login(data);
        dispatch(actionsForLogin.getUser(res.data))
        dispatch(actionsForApp.setIsLoggedIn(true))
        dispatch(actionsForLogin.setStatusLogin("succeeded"))
    } catch (e: any) {
        dispatch(actionsForLogin.setStatusLogin("succeeded"))
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        dispatch(actionsForLogin.setError(error))
    }
};
export const logout = () => async (dispatch: Dispatch) => {
    try {
        dispatch(actionsForLogin.setStatusLogin("loading"))
        await authAPI.logout();
        dispatch(actionsForLogin.setStatusLogin("succeeded"))
        dispatch(actionsForApp.setIsLoggedIn(false));
    } catch (e: any) {
        dispatch(actionsForLogin.setStatusLogin("succeeded"))
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(actionsForLogin.setError(error))
    }
};


// types
export type InitialLoginStateType = {
    status: StatusType
    error: string | null
    user: LoginResponseType | null
};
export type LoginActionType = InferActionType<typeof actionsForLogin>;

