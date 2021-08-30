import React from "react";
import s from "./TablePackList.module.scss";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../app/store";
import {PackDomainType} from "../../packReduser";
import {Button} from "../../../common/Button/Button";

type TablePackListPropsType = {}


export const TablePackList: React.FC<TablePackListPropsType> = () => {

   const pack = useSelector<AppRootStateType, PackDomainType[]>(state => state.pack)

   return (
      <div className={s.table}>
         <table className={s.table__block}>
            <thead>
            <tr>
               <th className={s.col1}>Name</th>
               <th className={s.col2}>Cards</th>
               <th className={s.col3}>Last Updated</th>
               <th className={s.col4}>Created by</th>
               <th className={s.col5}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
               pack.map(t =>
                  <tr key={t._id}>
                     <th className={s.col1}>{t.name}</th>
                     <th className={s.col2}>{t.cardsCount}</th>
                     <th className={s.col3}>{t.created}</th>
                     <th className={s.col4}>{t.user_name}</th>
                     <th className={`${s.col5} ${s.btn}`}>
                        <Button rounded={false} color='red'>Delete</Button>
                        <Button rounded={false} color='light-blue'>Edit</Button>
                        <Button rounded={false} color='light-blue'>Learn</Button>
                     </th>
                  </tr>
               )
            }
            </tbody>
         </table>
      </div>
   )
}
