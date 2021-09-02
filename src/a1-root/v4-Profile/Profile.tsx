import React from "react";
import style from "./Profile.module.css";
import {AppRootStateType} from "../../app/store";
import {useSelector} from "react-redux";
import {UserDataDomainType} from "../v2-Login/loginReduser";
import {Redirect} from "react-router-dom";
import {PATH} from "../../app/App";

export const Profile: React.FC = React.memo(() => {

    const user = useSelector<AppRootStateType, UserDataDomainType>(state => state.login)

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);

    if (!isLoggedIn) {
        return <Redirect to={PATH.PET_LOGIN}/>
    }

    return (
        <div className={style.App}>
            <h1>{user.name}</h1>
        </div>
    );
});

