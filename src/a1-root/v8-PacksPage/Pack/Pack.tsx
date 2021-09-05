import React, {useState} from "react";
import s from "./Pack.module.scss";
import global from "../../../style/global.module.scss"
import {SearchBlock} from "../../common/StylizedСomponents/SearchBlock/SearchBlock";
import {TablePackList} from "./TablePackList/TablePackList";
import {Modal} from "../../common/Modal/Modal";
import {InputField} from "../../common/InputField/InputField";
import {Button} from "../../common/Button/Button";
import {useDispatch} from "react-redux";
import {createPack} from "../packReduser";
import {PaginationWrapper} from "../../common/Pagination/PaginationWrapper";
import {actionsForStateOfMyPackSortDate} from "../../common/StateOfMyPackSortDate/StateOfMyPackSortDateReduser";

type PackPropsType = {
   pageCount: number
   currentPage: number
   cardPacksTotalCount: number
   setPackPageCount: (val: number) => void
   setPackPage: (val: number) => void

}


export const Pack: React.FC<PackPropsType> = ({
                                                 cardPacksTotalCount,
                                                 currentPage,
                                                 pageCount,
                                                 setPackPage,
                                                 setPackPageCount,
                                              }) => {
   const [addPackModal, setAddPackModal] = useState(false);
   const [newPackName, setNewPackName] = useState('');
   const dispatch = useDispatch();

   const searchByName = (name: string) => {
      dispatch(actionsForStateOfMyPackSortDate.setFlagName(true))
      dispatch(actionsForStateOfMyPackSortDate.valueName(name))
   }

   const cancelHandler = () => {
      setAddPackModal(false)
   }

   const setNewPackHandler = () => {
      dispatch(createPack({name: newPackName}, {pageCount: pageCount}))
      setNewPackName('');
      setAddPackModal(false)
   }


   return (
      <div className={s.pack}>
         <h1>Packs list</h1>
         <SearchBlock
            buttonName='Add new pack'
            debounceCallback={searchByName}
            isModalOpen={setAddPackModal}
         />

         <TablePackList/>
         <PaginationWrapper
            cardPacksTotalCount={cardPacksTotalCount}
            currentPage={currentPage}
            pageCount={pageCount}
            setPackPageCount={setPackPageCount}
            setPackPage={setPackPage}
         />

         <Modal modalActive={addPackModal} setModalActive={setAddPackModal}>
            <div className={s.pack__modal}>
               <h2>Add new pack</h2>
               <InputField
                  value={newPackName}
                  onChange={e => setNewPackName(e.currentTarget.value)}
                  label='New Pack'
               />
               <div className={global.modal__btn}>
                  <Button
                     width={120}
                     rounded
                     color='light-blue'
                     onClick={cancelHandler}
                  >Cancel</Button>
                  <Button
                     onClick={setNewPackHandler}
                     width={120}
                     rounded
                     color='dark-blue'
                  >Save</Button>
               </div>
            </div>
         </Modal>
      </div>
   )
}
