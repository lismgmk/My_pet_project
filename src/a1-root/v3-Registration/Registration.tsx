import React, {ChangeEvent, useEffect, useState} from "react";
import style from "./Registration.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";
import {actionsForRegister, register} from "./registrationReducer";
import {PATH} from "../../app/App";
import {AppRootStateType} from "../../app/store";
import {AuthModal} from "../common/StylizedСomponents/AuthModal/AuthModal";
import {InputField} from "../common/InputField/InputField";
import {Button} from "../common/Button/Button";
import {Error} from "../common/Error/Error";
import {actionsForApp} from "../../app/appReducer";

function Registration() {
    const isRegistered = useSelector<AppRootStateType, boolean>(
        (state) => state.registration.isRegistered
    );
    const isFetching = useSelector<AppRootStateType, boolean>(
        (state) => state.registration.isFetching
    );
    const error = useSelector<AppRootStateType, string | null>(
        (state) => state.app.error
    );
    const dispatch = useDispatch();

    useEffect(() => {
        const id = setTimeout(() => {
            dispatch(actionsForApp.setAppError(""));
        }, 5000);

        return () => {
            clearTimeout(id)
        };
    });

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
        } else {
            dispatch(actionsForApp.setAppError("not valid email/password /ᐠ-ꞈ-ᐟ\\"));
        }
        // setEmail("");
        setPassword("");
        setConfirmedPassword("");
    };

    if (!isRegistered) {
        return (
            <AuthModal subtitle='Sign Up'>
                <InputField
                    label='Email'
                    type='email'
                    value={email}
                    disabled={isFetching}
                    onChange={onEmailChange}
                />
                <InputField
                    label='Password'
                    type='password'
                    value={password}
                    disabled={isFetching}
                    onChange={onPasswordChange}
                />
                <InputField
                    label='Confirm password'
                    type='password'
                    value={confirmedPassword}
                    disabled={isFetching}
                    onChange={onConfirmedPasswordChange}
                />
                <Error errorMessage={error}/>
                <div className={style.button_block}>
                    <Button
                        rounded
                        color='light-blue'
                        onClick={onCancelBtnClick}
                        disabled={isFetching}
                        width={125}
                    >Cancel</Button>
                    <Button
                        rounded
                        color='dark-blue'
                        onClick={onRegisterBtnClick}
                        disabled={isFetching}
                        width={190}
                    >Register</Button>
                </div>
            </AuthModal>
        );
    } else {
        return <Redirect to={PATH.PET_LOGIN}/>;
    }
}

export default Registration;
