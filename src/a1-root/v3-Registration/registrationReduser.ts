import { AxiosError } from "axios";
import { Dispatch } from "redux";
import { registrationAPI } from "./registrationAPI";

type InitStateType = typeof initState;
type ActionsType =
  | ReturnType<typeof setIsRegisteredAC>
  | ReturnType<typeof setRegistrationErrorAC>
  | ReturnType<typeof setIsRegistrationFetchingAC>;

export const setIsRegisteredAC = (isRegistered: boolean) =>
  ({
    type: "registration/SET-IS-REGISTERED",
    isRegistered,
  } as const);
export const setIsRegistrationFetchingAC = (isFetching: boolean) =>
  ({
    type: "registration/SET-IS-FETCHING",
    isFetching,
  } as const);
export const setRegistrationErrorAC = (error: string) =>
  ({
    type: "registration/SET-ERROR",
    error,
  } as const);

export const registerTC = (email: string, password: string) => (
  dispatch: Dispatch
) => {
  dispatch(setIsRegistrationFetchingAC(true));
  registrationAPI
    .register(email, password)
    .then((res) => {
      dispatch(setIsRegisteredAC(true));
    })
    .catch((err: AxiosError) => {
      dispatch(setRegistrationErrorAC(err.response?.data.error));
    })
    .finally(() => dispatch(setIsRegistrationFetchingAC(false)));
};

const initState = {
  isRegistered: false,
  isFetching: false,
  error: "",
};

export const registrationReduser = (
  state = initState,
  action: ActionsType
): InitStateType => {
  switch (action.type) {
    case "registration/SET-IS-REGISTERED": {
      return { ...state, isRegistered: action.isRegistered };
    }

    case "registration/SET-IS-FETCHING": {
      return { ...state, isFetching: action.isFetching };
    }

    case "registration/SET-ERROR": {
      return { ...state, error: action.error };
    }

    default:
      return state;
  }
};
