import React, {FormEvent, useState} from "react";
import style from "./Login.module.css";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../../app/store";
import {PATH} from "../../app/App";
import {login} from "./loginReduser";
import {StatusType} from "../../app/appReducer";


export const Login: React.FC = React.memo(() => {

    const [data, setData] = useState({email: '', password: '', rememberMe: false});

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status);
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error);

    const dispatch: Dispatch<any> = useDispatch();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        dispatch(login(data));
        e.preventDefault();
    };

    if (isLoggedIn) {
        return <Redirect to={PATH.PET_PROFILE}/>
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={data.email}
                    onChange={
                        (e) => setData({...data, email: e.target.value})
                    }
                />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={data.password}
                    onChange={
                        (e) => setData({...data, password: e.target.value})
                    }
                />
            </div>

            <div>
                <label htmlFor="rememberMe">rememberMe</label>
                <input
                    type="checkBox"
                    id="checkBox"
                    checked={data.rememberMe}
                    onChange={
                        (e) => setData({...data, rememberMe: e.target.checked})
                    }
                />
            </div>
            <button type={"submit"} disabled={status === "loading"}>Login</button>
            <span style={{color: "red"}}>{ error ? error : null }</span>
        </form>
    );
})
