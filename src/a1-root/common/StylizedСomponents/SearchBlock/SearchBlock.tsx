import React, {ChangeEvent, useState} from "react";
import s from "./SearchBlock.module.scss";
import {useDebounce} from "../../../../hook/useDebounce";
import {SearchField} from "../../SearchField/SearchField";
import {Button} from "../../Button/Button";

type SearchBlockPropsType = {
   isModalOpen: (value: boolean) => void
   debounceCallback: (name: string) => void
   buttonName: string
   btnVisible?: boolean
}


export const SearchBlock: React.FC<SearchBlockPropsType> = React.memo((props) => {
   const {isModalOpen, debounceCallback, buttonName, btnVisible} = props
   const [value, setValue] = useState('');

   const debouncedSearch = useDebounce(debounceCallback, 700)

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
      debouncedSearch(e.currentTarget.value);
   }

   return (
      <div className={s.search}>
         <SearchField
            placeholder='Search'
            value={value}
            onChange={onChangeHandler}
         />
         {!btnVisible && <div className={s.search__btn}>
            <Button onClick={() => isModalOpen(true)} rounded color='dark-blue'>{buttonName}</Button>
         </div>}
      </div>
   )
})
