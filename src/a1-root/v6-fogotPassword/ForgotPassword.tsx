import React, {FormEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom';
import {Dispatch} from 'redux';
import {PATH} from '../../app/App';
import {AppRootStateType} from '../../app/store';
import {actionsForPassword, forgotPassword, forgotStatusType} from "./forgotPasswordReduser";
import preloader from "../../image/preloader.gif";


export const ForgotPassword: React.FC = React.memo(() => {

    const [data, setData] = useState({
        email: '',
        from: 'test-front-admin <ai73a@yandex.by>',
        message: `<div style="background-color: lime; padding: 15px;">
  <a href='lismgmk.github.io/My_pet_project/#/set-password/$token$'>
  Password recower link
  </a></div>`
    });

    const status = useSelector<AppRootStateType, forgotStatusType>(state => state.forgotPassword.status)
    const error = useSelector<AppRootStateType, string>(state => state.forgotPassword.forgotPasswordError);

    const dispatch: Dispatch<any> = useDispatch();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        dispatch(forgotPassword(data));
        e.preventDefault();
    };
    if (status === "succeeded") {

        dispatch(actionsForPassword.forgotPasswordError(''))
        return <Redirect to={{
            pathname: PATH.PET_CHECK_EMAIL,
            state: {email: data.email}
        }}
        />
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
            <h3>Forgot your password?</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        id="email"
                        value={data.email}
                        placeholder='Email'
                        onChange={
                            (e) => setData({...data, email: e.target.value})
                        }
                    />
                    <label htmlFor="email">Enter your email address and we will send you further instructions </label>
                </div>
                <button type={"submit"}>Send Instructions</button>
                <span style={{color: "red"}}>{error ? error : null}</span>
            </form>
            <NavLink to={PATH.PET_LOGIN}>Did you remember your password?</NavLink>
        </div>

    );
})
