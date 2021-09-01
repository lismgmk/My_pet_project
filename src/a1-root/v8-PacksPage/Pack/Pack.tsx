import React, {useState} from "react";
import s from "./Pack.module.scss";
import global from "../../../style/global.module.scss"
import {SearchBlock} from "./SearchBlock";
import {TablePackList} from "./TablePackList/TablePackList";
import {Modal} from "../../common/Modal/Modal";
import {InputField} from "../../common/InputField/InputField";
import {Button} from "../../common/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {createPack, PackDomainType} from "../packReduser";
import {Pagination} from "../../utills/Pagination/Pagination";
import {AppRootStateType} from "../../../app/store";
import {actionsForPackPagination} from "../../utills/Pagination/paginationPackReduser";

type PackPropsType = {
    pageCount: number
    currentPage: number
    cardPacksTotalCount: number
}


export const Pack: React.FC<PackPropsType> = ({
                                                  cardPacksTotalCount,
                                                  currentPage,
                                                  pageCount,
                                              }) => {
    const [addPackModal, setAddPackModal] = useState(false);
    const [newPackName, setNewPackName] = useState('');
    const dispatch = useDispatch();

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
            <SearchBlock setAddPackModal={setAddPackModal}/>
            <TablePackList/>
            <div style={{height: 70}}/>
            <Pagination
                className={''}
                currentPage={currentPage}
                totalCount={cardPacksTotalCount}
                pageSize={pageCount}
                siblingCount={1}
            />
            <select onChange={(e)=>{
                dispatch(actionsForPackPagination.setPackPageCount(+e.currentTarget.value))}}>
               <option selected={pageCount == 3} value={3}>3</option>
               <option selected={pageCount == 5} value={5}>5</option>
               <option selected={pageCount == 10} value={10}>10</option>
            </select>
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
