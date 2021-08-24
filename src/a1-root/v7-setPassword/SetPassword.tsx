import React, {FormEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom';
import {Dispatch} from 'redux';
import {PATH} from '../../app/App';
import {StatusType} from '../../app/appReducer';
import {AppRootStateType} from '../../app/store';
import {getPassword} from "../v6-fogotPassword/forgotPasswordReduser";
import {SetType} from "../../api/forgot-api/forgotAPI";


export const SetPassword: React.FC = React.memo(() => {

    const [password, setPassword] = useState('');

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error);

    const dispatch: Dispatch<any> = useDispatch();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        // dispatch(getPassword(data:SetType));
        e.preventDefault();
    };

    if (isLoggedIn) {
        <Redirect to={PATH.PET_PROFILE}/>
    }

    return (
        <div>
            <h2>It-incubator</h2>
            <h3>Create new password</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder='password'
                        onChange={
                            (e) => setPassword(e.target.value)
                        }
                    />
                    <label htmlFor="email">Create new password and we will send you further instructions to
                        email </label>
                </div>


                <button type={"submit"} disabled={status === "loading"}>Create new password</button>
                <span style={{color: "red"}}>{error ? error : null}</span>
            </form>

            <NavLink to={PATH.PET_LOGIN}>Did you remember your password?</NavLink>


        </div>

    );
})