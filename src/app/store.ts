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
import {PackActionType, packReducer} from "../a1-root/v8-PacksPage/packReduser";
import {CardsActionType, cardsReducer} from "../a1-root/v9-Card/cardsReduser";
import {
    PaginationActionPackType,
    paginationPackReducer
} from "../a1-root/common/Pagination/paginationPackReduser";
import {PaginationActionCardType, paginationCardReduser} from "../a1-root/common/Pagination/paginationCardReduser";
import {
    StateOfMyPackSortDateActionType,
    StateOfMyPackSortDateReduser
} from "../a1-root/common/StateOfMyPackSortDate/StateOfMyPackSortDateReduser";


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
    paginationPack: paginationPackReducer,
    paginationCard: paginationCardReduser,
    StateOfMyPackSortDate: StateOfMyPackSortDateReduser
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type CommonActionTypeForApp = LoginActionType | AppActionType
    | ActionsForFogotPasswordType | ActionsForSetPasswordType
    | RegisterActionType | PackActionType
    | CardsActionType
    | PaginationActionPackType
    | PaginationActionCardType
    | StateOfMyPackSortDateActionType;

export type InferActionType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;


// @ts-ignore
window.store = store;
