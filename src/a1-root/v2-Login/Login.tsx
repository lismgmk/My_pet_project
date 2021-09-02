import React, {FormEvent, FocusEvent, useState, useEffect} from "react";
import style from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {NavLink, Redirect} from "react-router-dom";
import {AppRootStateType} from "../../app/store";
import {PATH} from "../../app/App";
import {login} from "./loginReduser";
import {actionsForApp, StatusType} from "../../app/appReducer";
import {AuthModal} from "../common/StylizedСomponents/AuthModal/AuthModal";
import {InputField} from "../common/InputField/InputField";
import Checkbox from "../common/Checkbox/Checkbox";
import {Button} from "../common/Button/Button";
import {Error} from "../common/Error/Error";
import {Preloader} from "../common/Preloader/Preloader";


export const Login: React.FC = React.memo(() => {

    const [data, setData] = useState({email: '', password: '', rememberMe: false});
    const [errors, setErrors] = useState({
        emailValid: false,
        passwordValid: false,
        formErrors: {
            email: '',
            password: '',
        },
    });

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status);
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


    const validate = (e: FocusEvent<HTMLInputElement>) => {
        switch (e.currentTarget.type) {
            case "email":
                if (!e.currentTarget.value) {
                    setErrors({...errors, emailValid: true, formErrors: {...errors.formErrors, email: "Required"}});
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.currentTarget.value)) {
                    setErrors({
                        ...errors,
                        emailValid: true,
                        formErrors: {...errors.formErrors, email: "Invalid email address"}
                    });
                }
                break;
            case "password":
                if (!e.currentTarget.value) {
                    setErrors({
                        ...errors,
                        passwordValid: true,
                        formErrors: {...errors.formErrors, password: "Required"},
                    });
                } else if (e.currentTarget.value.length < 6) {
                    setErrors({
                        ...errors,
                        passwordValid: true,
                        formErrors: {...errors.formErrors, password: "Invalid password, minimum length 8 characters"},
                    });
                }
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        dispatch(login(data));
        e.preventDefault();
    };

    if (isLoggedIn) {
        return <Redirect to={PATH.PET_PROFILE}/>
    }

    return (
        <AuthModal subtitle={'Sign In'}>
            {status === 'loading' && <Preloader/>}
            <form onSubmit={handleSubmit}>
                <InputField
                    label={'Email'}
                    type={'email'}
                    value={data.email}
                    onBlur={e => validate(e)}
                    onChange={e => setData({...data, email: e.target.value})}
                    error={errors.emailValid ? errors.formErrors.email : null}
                />

                <InputField
                    label={'Password'}
                    type="password"
                    onBlur={e => validate(e)}
                    value={data.password}
                    onChange={e => setData({...data, password: e.target.value})}
                    error={errors.passwordValid ? errors.formErrors.password : null}
                />

                <div className={style.checkbox_block}>
                    <Checkbox
                        checked={data.rememberMe}
                        onChange={e => setData({...data, rememberMe: e.target.checked})}
                    >Remember Me</Checkbox>
                    <NavLink to={PATH.PET_FORGOT_PASSWORD}>Forgot Password</NavLink>
                </div>
                <Error errorMessage={error}/>
                <div className={style.button_block}>
                    <Button
                        color='dark-blue'
                        rounded
                        type={"submit"}
                        disabled={status === "loading"}
                    >Login</Button>
                </div>
            </form>
            <div className={style.bottom}>
                <p>Don’t have an account?</p>
                <NavLink to={PATH.PET_REGISTRATION}>Sign Up</NavLink>
            </div>
        </AuthModal>
    );
})
