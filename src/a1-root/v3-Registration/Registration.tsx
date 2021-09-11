import React, {ChangeEvent, useEffect, useState} from "react";
import style from "./Registration.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";
import {register} from "./registrationReducer";
import {PATH} from "../../app/App";
import {AppRootStateType} from "../../app/store";
import {AuthModal} from "../common/StylizedСomponents/AuthModal/AuthModal";
import {InputField} from "../common/InputField/InputField";
import {Button} from "../common/Button/Button";
import {Error} from "../common/Error/Error";
import {actionsForApp, StatusType} from "../../app/appReducer";
import {Preloader} from "../common/Preloader/Preloader";

function Registration() {

    const dispatch = useDispatch();


    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLogedIn);
    const error = useSelector<AppRootStateType, string | null>(state => state.registration.error);
    const status = useSelector<AppRootStateType, StatusType>(state => state.registration.status);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const history = useHistory();

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
        dispatch(actionsForApp.setAppError(""));
    };
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
        dispatch(actionsForApp.setAppError(""));
    };
    const onConfirmedPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmedPassword(e.currentTarget.value);
        dispatch(actionsForApp.setAppError(""));
    };
    const onCancelBtnClick = () => history.push(PATH.PET_LOGIN);
    const onRegisterBtnClick = () => {
        if (
            email &&
            password &&
            confirmedPassword &&
            password === confirmedPassword
        ) {
            dispatch(register({email, password: confirmedPassword}));
        }
        setEmail("");
        setPassword("");
        setConfirmedPassword("");
    }

    if (!isLoggedIn) {
        return <Redirect to={PATH.PET_LOGIN}/>;
    }
    if (status === 'loading') {
        return <Preloader/>
    }
        return (
            <AuthModal subtitle='Sign Up'>
                <InputField
                    label='Email'
                    type='email'
                    value={email}
                    onChange={onEmailChange}
                />
                <InputField
                    label='Password'
                    type='password'
                    value={password}
                    onChange={onPasswordChange}
                />
                <InputField
                    label='Confirm password'
                    type='password'
                    value={confirmedPassword}
                    onChange={onConfirmedPasswordChange}
                />
                <Error errorMessage={error}/>
                <div className={style.button_block}>
                    <Button
                        rounded
                        color='light-blue'
                        onClick={onCancelBtnClick}
                        width={125}
                    >Cancel</Button>
                    <Button
                        rounded
                        color='dark-blue'
                        onClick={onRegisterBtnClick}
                        width={190}
                    >Register</Button>
                </div>
            </AuthModal>
        );

}

export default Registration;
