import React, {FormEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect, useParams} from 'react-router-dom';
import {Dispatch} from 'redux';
import {PATH} from '../../app/App';
import {actionsForApp, StatusType} from '../../app/appReducer';
import {AppRootStateType} from '../../app/store';
import {actionsForPassword, getPassword} from "../v6-fogotPassword/forgotPasswordReduser";
import preloader from "../../image/preloader.gif";


export const SetPassword: React.FC = React.memo(() => {

    const [data, setData] = useState({
        password: '',
        resetPasswordToken: ''
    });

    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    const error = useSelector<AppRootStateType, string | null>(state => state.forgotPassword.forgotPasswordError);

    const dispatch: Dispatch<any> = useDispatch();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(getPassword(data))

    };
    const {token} = useParams<{ token: string }>();

    if (status === "succeeded") {
        dispatch(actionsForPassword.forgotPasswordError(''))
        dispatch(actionsForApp.setAppStatus('idle'))
        return <Redirect to={PATH.PET_LOGIN}/>
    }
    if (status === "loading") {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <img src={preloader} alt=""/>
        </div>
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
                        value={data.password}
                        placeholder='password'
                        onChange={
                            (e) => setData({resetPasswordToken: token, password: e.target.value})
                        }
                    />
                </div>
                <button type={"submit"}>Create new password</button>
                <span style={{color: "red"}}>{error ? error : null}</span>
            </form>

        </div>

    );
})