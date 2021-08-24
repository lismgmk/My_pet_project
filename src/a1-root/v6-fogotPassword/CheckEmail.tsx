import React, {FormEvent, useState } from 'react';
import {useLocation} from "react-router";



export const CheckEmail: React.FC = React.memo(() => {

    const location = useLocation()
// @ts-ignore
    let mail = location.state.email

    return (
      <div>
          <h2>It-incubator</h2>
          <h3>Check Email</h3>
          <div>{`We’ve sent an Email with instructions to ${mail}`}</div>
      </div>

  );
})
