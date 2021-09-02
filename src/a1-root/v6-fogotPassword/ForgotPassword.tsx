import React, {FormEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom';
import {Dispatch} from 'redux';
import {PATH} from '../../app/App';
import {AppRootStateType} from '../../app/store';
import {actionsForPassword, forgotPassword, forgotStatusType} from "./forgotPasswordReduser";
import {Preloader} from "../common/Preloader/Preloader";
import {AuthModal} from "../common/StylizedСomponents/AuthModal/AuthModal";
import {InputField} from "../common/InputField/InputField";
import style from "./ForgotPasswoed.module.scss";
import {Button} from "../common/Button/Button";
import {Error} from "../common/Error/Error";
import {actionsForApp} from '../../app/appReducer';


export const ForgotPassword: React.FC = React.memo(() => {

    const [data, setData] = useState({
        email: '',
        from: 'test-front-admin <ai73a@yandex.by>',
        message: `<div style="background-color: lime; padding: 15px;">
  <a href='https://lismgmk.github.io/My_pet_project/#/set-password/$token$'>
  Password recower link
  </a></div>`
    });

    const status = useSelector<AppRootStateType, forgotStatusType>(state => state.forgotPassword.status)
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error);

    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        const id = setTimeout(() => {
            dispatch(actionsForApp.setAppError(""));
        }, 5000);

        return () => {
            clearTimeout(id)
        };
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        dispatch(forgotPassword(data));
        e.preventDefault();
    };
    if (status === "succeeded") {

        dispatch(actionsForApp.setAppError(""))
        return <Redirect to={{
            pathname: PATH.PET_CHECK_EMAIL,
            state: {email: data.email}
        }}
        />
    }
    if (status === "loading") {
        return <Preloader/>
    }
    return (
        <AuthModal subtitle='Forgot your password?'>
            <form onSubmit={handleSubmit} className={style.forgot}>
                <InputField
                    label='Email'
                    type="email"
                    id="email"
                    value={data.email}
                    onChange={e => setData({...data, email: e.target.value})}
                />
                <p>Enter your email address and we will send you further instructions</p>
                <Error errorMessage={error}/>
                <Button
                    rounded
                    color='dark-blue'
                    type={"submit"}
                >Send Instructions</Button>

            </form>
            <div className={style.forgotBottom}>
                <p>Did you remember your password?</p>
                <NavLink to={PATH.PET_LOGIN}>Try logging in</NavLink>
            </div>
        </AuthModal>

    );
})
