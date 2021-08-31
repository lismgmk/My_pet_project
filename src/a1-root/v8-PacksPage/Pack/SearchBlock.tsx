import React from "react";
import s from "./Pack.module.scss";
import {Button} from "../../common/Button/Button";
import {SearchField} from "../../common/SearchField/SearchField";

type SearchBlockPropsType = {

}


export const SearchBlock: React.FC<SearchBlockPropsType> = () => {


   return (
      <div className={s.pack__inputBlock}>
         <SearchField
            placeholder='Search'
         />
         <div className={s.pack__btn}>
            <Button rounded color='dark-blue'>Add new pack</Button>
         </div>
      </div>
   )
}
