import React, {FormEvent, FocusEvent, useState} from "react";
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

    const validate = (e: FocusEvent<HTMLInputElement>) => {
        debugger
        switch (e.currentTarget.type) {
            case "email":
                if (!e.currentTarget.value) {
                    setErrors({...errors, emailValid: true, formErrors: {...errors.formErrors, email: "Required"}});
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.currentTarget.value)) {
                    setErrors({...errors, emailValid: true, formErrors: {...errors.formErrors, email: "Invalid email address"}});
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
                        formErrors: {...errors.formErrors, password: "Invalid password, minimum length 6 characters"},
                    });
                } else if (e.currentTarget.value.length > 16) {
                    setErrors({
                        ...errors,
                        passwordValid: true,
                        formErrors: {...errors.formErrors,
                            password: "Invalid password, maximum length 16 characters"},
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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" aria-required={true}>Email</label>
                <input
                    onBlur={(e) => validate(e)}
                    type="email"
                    id="email"
                    value={data.email}
                    onChange={
                        (e) => setData({...data, email: e.target.value})
                    }
                />
                {errors.emailValid ? <div style={{color: "red"}}>{errors.formErrors.email}</div> : null}
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input
                    onBlur={(e) => validate(e)}
                    type="password"
                    id="password"
                    value={data.password}
                    onChange={
                        (e) => setData({...data, password: e.target.value})
                    }
                />
                {errors.passwordValid ? <div style={{color: "red"}}>{errors.formErrors.password}</div> : null}
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
