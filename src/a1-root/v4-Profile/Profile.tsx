import React from "react";
import style from "./Profile.module.css";
import {AppRootStateType} from "../../app/store";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {PATH} from "../../app/App";
import {LoginResponseType} from "../../api/login-api/loginAPI";

export const Profile: React.FC = React.memo(() => {

    const user = useSelector<AppRootStateType, LoginResponseType | null>(state => state.login.user)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLogedIn);


    if (!isLoggedIn) {
        return <Redirect to={PATH.PET_LOGIN}/>
    }

    return (
        <div className={style.App}>
            <h1>{user && user.name}</h1>
        </div>
    );
});

