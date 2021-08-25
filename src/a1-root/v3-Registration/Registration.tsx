import React, { ChangeEvent, useEffect, useState } from "react";
import style from "./Registration.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../store";
import { Redirect, useHistory } from "react-router-dom";
import { PATH } from "../App";
import { registerTC, setRegistrationErrorAC } from "./registrationReduser";

function Registration() {
  useEffect(() => {
    return () => {
      dispatch(setRegistrationErrorAC(""));
    };
  }, []);

  const isRegistered = useSelector<AppRootStateType, boolean>(
    (state) => state.registration.isRegistered
  );
  const isFetching = useSelector<AppRootStateType, boolean>(
    (state) => state.registration.isFetching
  );
  const error = useSelector<AppRootStateType, string>(
    (state) => state.registration.error
  );

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const history = useHistory();

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    dispatch(setRegistrationErrorAC(""));
  };
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    dispatch(setRegistrationErrorAC(""));
  };
  const onConfirmedPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmedPassword(e.currentTarget.value);
    dispatch(setRegistrationErrorAC(""));
  };
  const onCancelBtnClick = () => history.push(PATH.PET_LOGIN);
  const onRegisterBtnClick = () => {
    if (
      email &&
      password &&
      confirmedPassword &&
      password === confirmedPassword
    ) {
      dispatch(registerTC(email, confirmedPassword));
    } else {
      dispatch(setRegistrationErrorAC("not valid email/password /ᐠ-ꞈ-ᐟ\\"));
    }
    setEmail("");
    setPassword("");
    setConfirmedPassword("");
  };

  if (!isRegistered) {
    return (
      <div className={style.mainDiv}>
        <h1 className={style.header}>Registration</h1>

        <div className={style.form}>
          <div className={style.error}>{error}</div>

          <div className={style.formField}>
            <div>Email</div>
            <input
              type={"email"}
              value={email}
              disabled={isFetching}
              onChange={onEmailChange}
            />
          </div>

          <div className={style.formField}>
            <div>Password</div>
            <input
              type={"password"}
              value={password}
              disabled={isFetching}
              onChange={onPasswordChange}
            />
          </div>

          <div className={style.formField}>
            <div>Confirm password</div>
            <input
              type={"password"}
              value={confirmedPassword}
              disabled={isFetching}
              onChange={onConfirmedPasswordChange}
            />
          </div>

          <button
            onClick={onCancelBtnClick}
            disabled={isFetching}
            className={style.cancelBtn}
          >
            Cancel
          </button>
          <button
            onClick={onRegisterBtnClick}
            disabled={isFetching}
            className={style.registerBtn}
          >
            Register
          </button>
        </div>
      </div>
    );
  } else {
    return <Redirect to={PATH.PET_LOGIN} />;
  }
}

export default Registration;
