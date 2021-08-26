import React from "react";
import style from "./AuthModal.module.scss";
import {H1} from "../Headings/H1";
import {H2} from "../Headings/H2";

type AuthModalPropsType = {
    subtitle: string
}


export const AuthModal: React.FC<AuthModalPropsType> = (props) => {
const {children, subtitle} = props

   return (
      <div className={style.container}>
         <div className={style.container__body}>
             <H1/>
             <H2>{subtitle}</H2>
            {children}
         </div>
      </div>
   )
}
