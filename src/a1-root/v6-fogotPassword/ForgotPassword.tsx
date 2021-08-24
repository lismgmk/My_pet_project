import React, {FormEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, NavLink, Redirect} from 'react-router-dom';
import {Dispatch} from 'redux';
import {PATH} from '../../app/App';
import {StatusType} from '../../app/appReducer';
import {AppRootStateType} from '../../app/store';
import {login} from '../v2-Login/loginReduser';
import {forgotPassword} from "./forgotPasswordReduser";


export const ForgotPassword: React.FC = React.memo(() => {

    const [data, setData] = useState({
        email: '',
        from: 'test-front-admin <ai73a@yandex.by>',
        message: `<div style="background-color: lime; padding: 15px; error: string;">
  <a href='http://localhost:3000/#/set-new-password/$token$'>
  password recower link
  </a></div>`
    });

    const isSendEmail = useSelector<AppRootStateType, boolean>(state => state.forgotPassword.isSendEmail);
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error);

    const dispatch: Dispatch<any> = useDispatch();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        dispatch(forgotPassword(data));
        e.preventDefault();
    };

    // if (isLoggedIn) {
    //   return <Redirect to={PATH.PET_PROFILE}/>
    // }


    // @ts-ignore
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


                <button type={"submit"} disabled={status === "loading"}>Send Instructions</button>
                <span style={{color: "red"}}>{error ? error : null}</span>
            </form>

            <NavLink to={PATH.PET_LOGIN}>Did you remember your password?</NavLink>
            {isSendEmail &&
            <Redirect to={{
                pathname: PATH.PET_CHECK_EMAIL,
                state: {email: data.email}
            }}
            />
            }

        </div>

    );
})
