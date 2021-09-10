import React, {useEffect} from "react";
import style from "./Profile.module.css";
import {AppRootStateType} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {UserDataDomainType} from "../v2-Login/loginReduser";
import {Redirect} from "react-router-dom";
import {PATH} from "../../app/App";
import {initializeApp} from "../../app/appReducer";
import {Dispatch} from "redux";

export const Profile: React.FC = React.memo(() => {

    const user = useSelector<AppRootStateType, UserDataDomainType>(state => state.login)

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);

    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        dispatch(initializeApp())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isLoggedIn) {
        return <Redirect to={PATH.PET_LOGIN}/>
    }

    return (
        <div className={style.App}>
            <h1>{user.name}</h1>
        </div>
    );
});

