import {RegisterDataType, registrationAPI} from "../../api/register-api/registrationAPI";
import {actionsForApp, ThunkDispatchType, ThunkType} from "../../app/appReducer";
import {CommonActionTypeForApp, InferActionType} from "../../app/store";


const initialState = {
    isRegistered: false,
    isFetching: false,
};

export const registrationReducer =
    (state: InitialRegisterStateType = initialState, action: CommonActionTypeForApp): InitialRegisterStateType => {
        switch (action.type) {
            case "registration/SET-IS-REGISTERED":
                return {...state, isRegistered: action.isRegistered};
            case "registration/SET-IS-FETCHING":
                return {...state, isFetching: action.isFetching};
            default:
                return state;
        }
    };


//actions
export const actionsForRegister = {
    setIsRegistered: (isRegistered: boolean) => ({type: "registration/SET-IS-REGISTERED", isRegistered,} as const),
    setIsRegistrationFetching: (isFetching: boolean) => ({type: "registration/SET-IS-FETCHING", isFetching,} as const),
};


//thunk
export const register = (data: RegisterDataType): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(actionsForRegister.setIsRegistrationFetching(true));
        await registrationAPI.register(data)
        dispatch(actionsForRegister.setIsRegistered(true));
        dispatch(actionsForRegister.setIsRegistrationFetching(false))
    } catch (e: any) {
        dispatch(actionsForApp.setAppError(e.response?.data.error));
        dispatch(actionsForRegister.setIsRegistrationFetching(false));
    }
};


//types
export type InitialRegisterStateType = typeof initialState;
export type RegisterActionType = InferActionType<typeof actionsForRegister>;
