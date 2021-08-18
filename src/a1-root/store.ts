import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {mainReduser} from "./v1-Main/mainReduser";
import {loginReduser} from "./v2-Login/loginReduser";
import {profileReduser} from "./v4-Profile/profileReduser";
import {page404Reduser} from "./v5-Page_404/pag404Reduser";
import {newPasswordReduser} from "./v7-New_password/newPasswordReduser";
import {rebildPasswordReduser} from "./v6-Rebild_password/rebildPasswordReduser";
import {registrationReduser} from "./v3-Registration/registrationReduser";


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    main: mainReduser,
    login: loginReduser,
    registration: registrationReduser,
    profile: profileReduser,
    page404: page404Reduser,
    rebildPassword: rebildPasswordReduser,
    newPassword: newPasswordReduser
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

