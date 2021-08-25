import React, {useEffect} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Dispatch} from "redux";
import style from "./App.module.scss";
import Main from "../a1-root/v1-Main/Main";
import {Login} from "../a1-root/v2-Login/Login";
import {Profile} from "../a1-root/v4-Profile/Profile";
import Registration from "../a1-root/v3-Registration/Registration";
import Page404 from "../a1-root/v5-Page_404/Page404";
import {useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./appReducer";
import {AppRootStateType} from "./store";
import {Preloader} from "../a1-root/common/Preloader/Preloader";
import {Header} from "../a1-root/v0-Header/Header";
import {Card} from "../a1-root/v8-Card/Card";
import {ForgotPassword} from "../a1-root/v6-fogotPassword/ForgotPassword";
import {CheckEmail} from "../a1-root/v6-fogotPassword/CheckEmail";
import {SetPassword} from "../a1-root/v7-setPassword/SetPassword";


function App() {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const dispatch: Dispatch<any> = useDispatch();


    useEffect(() => {
        dispatch(initializeApp())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className={style.wrapper}>
            {!isInitialized && <Preloader/>}
            {isLoggedIn && <Header/>}
            <Switch>
                <Route path={PATH.PET_NULL} exact render={() => <Redirect to={PATH.PET_PROFILE}/>}/>
                <Route exact path={PATH.PET_MAIN} render={() => <Main/>}/>
                <Route exact path={PATH.PET_LOGIN} render={() => <Login/>}/>
                <Route exact path={PATH.PET_REGISTRATION} render={() => <Registration/>}/>
                <Route exact path={PATH.PET_PROFILE} render={() => <Profile/>}/>
                <Route exact path={PATH.PET_PAGE404} render={() => <Page404/>}/>
                <Route exact path={PATH.PET_FORGOT_PASSWORD} render={() => <ForgotPassword/>}/>
                <Route  path={PATH.PET_SET_PASSWORD } render={() => <SetPassword/>}/>
                <Route exact path={PATH.PET_CHECK_EMAIL} render={() => <CheckEmail/>}/>
                <Route exact path={PATH.PET_CARD} render={() => <Card/>}/>
                <Redirect to={PATH.PET_PROFILE}/>
                <Redirect from={'*'} to={PATH.PET_PAGE404}/>
            </Switch>
        </div>
    )
}

export default App;

export const PATH = {
    PET: '/',
    PET_MAIN: '/My-pet-project/main',
    PET_LOGIN: '/My-pet-project/login',
    PET_REGISTRATION: '/My-pet-project/registration',
    PET_PROFILE: '/My-pet-project/profile',
    PET_PAGE404: '/My-pet-project/page404',
    PET_FORGOT_PASSWORD: '/My-pet-project/forgot-password',
    PET_SET_PASSWORD: '/My-pet-project/set-password/:token',
    PET_CHECK_EMAIL: '/My-pet-project/check-email',
    PET_NULL: '/',
    PET_CARD: '/My-pet-project/card'
}
