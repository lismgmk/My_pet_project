import React from 'react';
import style from './Login.module.css'

function Login() {
  return (
    <div className={style.App}>
      <h1>Login</h1>
      <h1 style={{color: "red"}}>Logout</h1>
    </div>
  );
}

export default Login;
