import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {mainReduser} from "../a1-root/v1-Main/mainReduser";
import {profileReduser} from "../a1-root/v4-Profile/profileReduser";
import {page404Reduser} from "../a1-root/v5-Page_404/pag404Reduser";
import {newPasswordReduser} from "../a1-root/v7-New_password/newPasswordReduser";
import {rebildPasswordReduser} from "../a1-root/v6-Rebild_password/rebildPasswordReduser";
import {registrationReduser} from "../a1-root/v3-Registration/registrationReduser";
import {LoginActionType, loginReducer} from "../a1-root/v2-Login/loginReduser";
import {AppActionType, appReducer} from "./appReducer";


const rootReducer = combineReducers({
    app: appReducer,
    main: mainReduser,
    login: loginReducer,
    registration: registrationReduser,
    profile: profileReduser,
    page404: page404Reduser,
    rebildPassword: rebildPasswordReduser,
    newPassword: newPasswordReduser,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type CommonActionTypeForApp = LoginActionType | AppActionType;

export type InferActionType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;


// @ts-ignore
window.store = store;
