import React, {ChangeEvent, useState} from "react";
import s from "./Pack.module.scss";
import {Button} from "../../common/Button/Button";
import {SearchField} from "../../common/SearchField/SearchField";
import {fetchPack} from "../packReduser";
import {useDispatch} from "react-redux";
import {useDebounce} from "../../../hook/useDebounce";

type SearchBlockPropsType = {
   setAddPackModal: (value: boolean) => void
}


export const SearchBlock: React.FC<SearchBlockPropsType> = ({setAddPackModal}) => {
   const [value, setValue] = useState('');
   const dispatch =  useDispatch()

   const searchByName = (name: string) => {
      dispatch(fetchPack({packName: name, pageCount: 100}))
   }
   const debouncedSearch = useDebounce(searchByName, 700)

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
      debouncedSearch(e.currentTarget.value);
   }

   return (
      <div className={s.pack__inputBlock}>
         <SearchField
            placeholder='Search'
            value={value}
            onChange={onChangeHandler}
         />
         <div className={s.pack__btn}>
            <Button onClick={() => setAddPackModal(true)} rounded color='dark-blue'>Add new pack</Button>
         </div>
      </div>
   )
}
