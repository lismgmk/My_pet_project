import React from "react";
import style from "./Header.module.scss";
import {NavLink} from "react-router-dom";
import {PATH} from "../../app/App";
import {logout} from "../v2-Login/loginReduser";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Dispatch} from "redux";
import {AppInitialStateType} from "../../app/appReducer";
import {UserSvg} from "../../assets/icon/UserSVG";
import {CardSvg} from "../../assets/icon/CardSVG";

type HeaderPropsType = {}

export const Header: React.FC<HeaderPropsType> = () => {

    const appState = useSelector<AppRootStateType, AppInitialStateType>(state => state.app);
    const dispatch: Dispatch<any> = useDispatch();

    const handleSubmit = () => {
        dispatch(logout())
    };


    return (
        <header className={style.header}>
            <h2>Magic Card</h2>
            <nav className={style.header__nav}>
                <ul className={style.header__list}>
                    <li>
                        <NavLink to={PATH.PET_PACK} activeClassName={style.activeLink}><CardSvg/>Packs list</NavLink>
                    </li>
                    <li>
                        <NavLink to={PATH.PET_PROFILE} activeClassName={style.activeLink}><UserSvg/>Profile</NavLink>
                    </li>
                </ul>
            </nav>
            <button className={style.logout} onClick={handleSubmit} disabled={appState.status === "loading"}>Logout
            </button>
        </header>
    )
}
