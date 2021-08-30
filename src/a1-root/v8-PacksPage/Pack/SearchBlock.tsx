import React from "react";
import s from "./Pack.module.scss";
import {Button} from "../../common/Button/Button";

type SearchBlockPropsType = {

}


export const SearchBlock: React.FC<SearchBlockPropsType> = () => {

   return (
      <div className={s.pack__inputBlock}>
         <div className={s.pack__input}>
            <input type="text" placeholder='Search'/>
         </div>
         <div className={s.pack__btn}>
            <Button rounded={true} color='dark-blue'>Add new pack</Button>
         </div>
      </div>
   )
}
