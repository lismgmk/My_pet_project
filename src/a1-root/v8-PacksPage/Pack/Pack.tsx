import React from "react";
import s from "./Pack.module.scss";
import {SearchBlock} from "./SearchBlock";

type PackPropsType = {

}


export const Pack: React.FC<PackPropsType> = () => {

   return (
      <div className={s.pack}>
         <h1>Packs list</h1>
         <SearchBlock/>
      </div>
   )
}
