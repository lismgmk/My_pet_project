import React from "react";
import style from "./AuthModal.module.scss";

type AuthModalPropsType = {

}


export const AuthModal: React.FC<AuthModalPropsType> = ({children}) => {

   return (
      <div className={style.wrapper}>
          {children}
      </div>
   )
}
