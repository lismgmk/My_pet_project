import React, {FormEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect, useParams} from 'react-router-dom';
import {Dispatch} from 'redux';
import {PATH} from '../../app/App';
import {StatusType} from '../../app/appReducer';
import {AppRootStateType} from '../../app/store';
import {actionsForPassword, getPassword} from "../v6-fogotPassword/forgotPasswordReduser";
import {Preloader} from "../common/Preloader/Preloader";
import {AuthModal} from "../common/AuthModal /AuthModal";
import {InputField} from "../common/InputField/InputField";
import {Error} from "../common/Error/Error";
import style from "./SetPassword.module.scss";
import {Button} from "../common/Button/Button";



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
        return <Redirect to={PATH.PET_LOGIN}/>
    }
    if (status === "loading") {
        return <Preloader/>
    }
    return (
        <AuthModal subtitle='Create new password'>
            <form onSubmit={handleSubmit} className={style.setPassword}>
                <InputField
                    label='New password'
                    type="password"
                    id="password"
                    value={data.password}
                    onChange={e => setData({resetPasswordToken: token, password: e.target.value})}
                />

                <p>Create new password and we will send you further instructions to email</p>
                <Error error={error}/>
                <Button
                    type={"submit"}
                    rounded
                    color='dark-blue'
                >Create new password</Button>
            </form>
        </AuthModal>

    );
})