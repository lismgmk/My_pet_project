import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {profileReduser} from "../a1-root/v4-Profile/profileReduser";
import {page404Reduser} from "../a1-root/v5-Page_404/pag404Reduser";
import {
    RegisterActionType,
    registrationReducer
} from "../a1-root/v3-Registration/registrationReducer";
import {LoginActionType, loginReducer} from "../a1-root/v2-Login/loginReduser";
import {AppActionType, appReducer} from "./appReducer";
import {
    ActionsForFogotPasswordType,
    forgotPasswordReduser
} from "../a1-root/v6-fogotPassword/forgotPasswordReduser";
import {ActionsForSetPasswordType, setPasswordReduser} from "../a1-root/v7-setPassword/setPasswordReduser";
import {PackActionType, packReducer} from "../a1-root/v8-Pack/packReduser";
import {CardsActionType, cardsReducer} from "../a1-root/v8-Pack/cardsReduser";


const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReduser,
    page404: page404Reduser,
    forgotPassword: forgotPasswordReduser,
    setPassword: setPasswordReduser,
    pack: packReducer,
    cards: cardsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type CommonActionTypeForApp = LoginActionType | AppActionType
    | ActionsForFogotPasswordType | ActionsForSetPasswordType
    | RegisterActionType | PackActionType
    | CardsActionType ;

export type InferActionType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;


// @ts-ignore
window.store = store;
