import React from "react";
import style from "./Error.module.scss";

type ErrorPropsType = {
   error: string | null
}


export const Error: React.FC<ErrorPropsType> = ({error}) => {

   return <div className={style.error_block}>
       <span>{error ? error : null}</span>
   </div>
}
