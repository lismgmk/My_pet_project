import React from 'react';
import {Switch, Route} from 'react-router-dom';
import style from './App.module.css'
import Main from "./v1-Main/Main";
import Login from "./v2-Login/Login";
import Registration from "./v3-Registration/Registration";
import Profile from "./v4-Profile/Profile";
import Page_404 from "./v5-Page_404/Page_404";
import Rebild_password from "./v6-Rebild_password/Rebild_password";
import New_password from "./v7-New_password/New_password";
import {Redirect} from "react-router/ts4.0";

function App() {
    return (
        <>
            <Switch>
                <Route path={PATH.PET_NULL} exact render={() => <Redirect to={PATH.PET_MAIN}/>}/>

                <Route exact path={PATH.PET_MAIN} render={()=><Main/> }/>
                <Route exact path={PATH.PET_LOGIN} render={()=><Login/> }/>
                <Route exact path={PATH.PET_REISTRATION} render={()=><Registration/> }/>
                <Route exact path={PATH.PET_PROFILE} render={()=><Profile/> }/>
                <Route exact path={PATH.PET_PAGE404} render={()=><Page_404/> }/>
                <Route exact path={PATH.PET_REBILD_PASSWORD} render={()=><Rebild_password/> }/>
                <Route exact path={PATH.PET_NEW_PASSWORD} render={()=><New_password/> }/>

                <Redirect from={'*'} to={PATH.PET_PAGE404}/>
            </Switch>
        </>
    )
}

export default App

export const PATH = {
    PET: '/',
    PET_MAIN: '/My-pet-progect/main',
    PET_LOGIN: '/My-pet-progect/login',
    PET_REISTRATION: '/My-pet-progect/registration',
    PET_PROFILE: '/My-pet-progect/profile',
    PET_PAGE404: '/My-pet-progect/page404',
    PET_REBILD_PASSWORD: '/My-pet-progect/rebild-password',
    PET_NEW_PASSWORD: '/My-pet-progect/new-password',
    PET_NULL: '/'
}
