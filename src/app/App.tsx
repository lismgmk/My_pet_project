import React, {FormEvent, useEffect} from "react";
import {Switch, Route, Redirect, NavLink} from "react-router-dom";
import {Dispatch} from "redux";
import style from "./App.module.css";
import Main from "../a1-root/v1-Main/Main";
import {Login} from "../a1-root/v2-Login/Login";
import {Profile} from "../a1-root/v4-Profile/Profile";
import Registration from "../a1-root/v3-Registration/Registration";
import Page404 from "../a1-root/v5-Page_404/Page404";
import {useDispatch, useSelector} from "react-redux";
import {AppInitialStateType, initializeApp} from "./appReducer";
import {AppRootStateType} from "./store";
import preloader from "../image/preloader.gif";
import {logout} from "../a1-root/v2-Login/loginReduser";
import SetPassword from "../a1-root/v7-setPassword/SetPassword";
import {ForgotPassword} from "../a1-root/v6-fogotPassword/ForgotPassword";
import {CheckEmail} from "../a1-root/v6-fogotPassword/CheckEmail";


function App() {

    const appState = useSelector<AppRootStateType, AppInitialStateType>(state => state.app);
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);
    const dispatch: Dispatch<any> = useDispatch();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        dispatch(logout())
        e.preventDefault()
    };

    useEffect(() => {
        dispatch(initializeApp())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isInitialized) {
        return (
            <div
                style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <img src={preloader} alt=""/>
            </div>
        );
    }

    return (
        <>
            {
                appState.status === "loading"
                && <div
                    style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                    <img src={preloader} alt=""/>
                </div>
            }
            <div className={style.App}>
                <NavLink to={PATH.PET_MAIN} activeClassName={style.activeLink}>Main</NavLink>
                {
                    isLoggedIn
                        ? <form onSubmit={handleSubmit}>
                            <button type={"submit"} disabled={appState.status === "loading"}>Logout</button>
                        </form>
                        : <NavLink to={PATH.PET_LOGIN} activeClassName={style.activeLink}>Login</NavLink>
                }
                <NavLink to={PATH.PET_REGISTRATION} activeClassName={style.activeLink}>Registration</NavLink>
                <NavLink to={PATH.PET_PROFILE} activeClassName={style.activeLink}>Profile</NavLink>
                <NavLink to={PATH.PET_PAGE404} activeClassName={style.activeLink}>Page_404</NavLink>
                <NavLink to={PATH.PET_FORGOT_PASSWORD} activeClassName={style.activeLink}>Forgot_password</NavLink>
                <NavLink to={PATH.PET_SET_PASSWORD} activeClassName={style.activeLink}>Set_password</NavLink>
            </div>
            <Switch>
                <Route path={PATH.PET_NULL} exact render={() => <Redirect to={PATH.PET_MAIN}/>}/>

                <Route exact path={PATH.PET_MAIN} render={() => <Main/>}/>
                <Route exact path={PATH.PET_LOGIN} render={() => <Login/>}/>
                <Route exact path={PATH.PET_REGISTRATION} render={() => <Registration/>}/>
                <Route exact path={PATH.PET_PROFILE} render={() => <Profile/>}/>
                <Route exact path={PATH.PET_PAGE404} render={() => <Page404/>}/>
                <Route exact path={PATH.PET_FORGOT_PASSWORD} render={() => <ForgotPassword/>}/>
                <Route exact path={PATH.PET_SET_PASSWORD} render={() => <SetPassword/>}/>
                <Route exact path={PATH.PET_CHECK_EMAIL} render={() => <CheckEmail/>}/>

                <Redirect from={'*'} to={PATH.PET_PAGE404}/>
            </Switch>
        </>
    )
}

export default App

export const PATH = {
    PET: '/',
    PET_MAIN: '/My-pet-project/main',
    PET_LOGIN: '/My-pet-project/login',
    PET_REGISTRATION: '/My-pet-project/registration',
    PET_PROFILE: '/My-pet-project/profile',
    PET_PAGE404: '/My-pet-project/page404',
    PET_FORGOT_PASSWORD: '/My-pet-project/forgot-password',
    PET_SET_PASSWORD: '/My-pet-project/set-password',
    PET_CHECK_EMAIL: '/My-pet-project/check-email',
    PET_NULL: '/'
}
