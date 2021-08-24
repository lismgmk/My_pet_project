import React, {FormEvent, useState } from 'react';
import {useLocation} from "react-router";



export const CheckEmail: React.FC = React.memo((props) => {

    const location = useLocation()
    const { fromNotifications }: any = location.state


  // const [data, setData] = useState({email: '', password: '', rememberMe: false});
  //
  // const isSendEmail = useSelector<AppRootStateType, boolean>(state => state.forgotPassword.isSendEmail);
  // const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
  // const error = useSelector<AppRootStateType, string | null>(state => state.app.error);
  //
  // const dispatch: Dispatch<any> = useDispatch();
  //
  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   dispatch(login(data));
  //   e.preventDefault();
  // };

  // if (isLoggedIn) {
  //   return <Redirect to={PATH.PET_PROFILE}/>
  // }

  return (
      <div>
        <h2>{fromNotifications}</h2>
        {/*<h3>Forgot your password?</h3>*/}
        {/*<form onSubmit={handleSubmit}>*/}
        {/*  <div>*/}
        {/*    <input*/}
        {/*        type="email"*/}
        {/*        id="email"*/}
        {/*        value={data.email}*/}
        {/*        placeholder='Email'*/}
        {/*        onChange={*/}
        {/*          (e) => setData({...data, email: e.target.value})*/}
        {/*        }*/}
        {/*    />*/}
        {/*    <label htmlFor="email">Enter your email address and we will send you further instructions </label>*/}
        {/*  </div>*/}


        {/*  <button type={"submit"} disabled={status === "loading"}>Send Instructions</button>*/}
        {/*  <span style={{color: "red"}}>{ error ? error : null }</span>*/}
        {/*</form>*/}

        {/*<NavLink to={PATH.PET_LOGIN}>Did you remember your password?</NavLink>*/}
        {/*  {isSendEmail && <Redirect to={PATH.PET_CHECK_EMAIL}/>}*/}
      </div>

  );
})
