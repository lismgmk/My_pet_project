import React from "react";
import s from "./TableCardList.module.scss";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {CardDomainType} from "../cardsReduser";

type TablePackListPropsType = {
   id: string
}


export const TableCardList: React.FC<TablePackListPropsType> = ({id}) => {
   const card = useSelector<AppRootStateType, CardDomainType[]>(state => state.cards[id])
   return (
      <div className={s.table}>
         <table className={s.table__block}>
            <thead>
            <tr>
               <th className={s.col1}>Question</th>
               <th className={s.col2}>Answer</th>
               <th className={s.col3}>Last Updated</th>
               <th className={s.col4}>Grade</th>
            </tr>
            </thead>
            <tbody>
            {
               card.map(c =>
                  <tr key={c._id}>
                     <th className={s.col1}>{c.question}</th>
                     <th className={s.col2}>{c.answer}</th>
                     <th className={s.col3}>{(c.updated.slice(0, 10))}</th>
                     <th className={s.col4}>{c.grade}</th>
                  </tr>
               )
            }
            </tbody>
         </table>
      </div>
   )
}
