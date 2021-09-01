import React, {ChangeEvent, useState} from "react";
import s from "./Pack.module.scss";
import {useDispatch} from "react-redux";
import {Pagination} from "../../utills/Pagination/Pagination";
import {actionsForPackPagination} from "../../utills/Pagination/paginationPackReduser";

type PackPropsType = {
    pageCount: number
    currentPage: number
    cardPacksTotalCount: number
    setPackPageCount: (val: number)=>void
    setPackPage: (val: number)=>void
}


export const PaginationWrapper: React.FC<PackPropsType> = ({
                                                  cardPacksTotalCount,
                                                  currentPage,
                                                  pageCount,
                                                               setPackPageCount,
                                                               setPackPage
                                              }) => {

    const dispatch = useDispatch();
    // setPackPageCount
    //actionsForPackPagination.setPackPageCount
    return (
        <div className={s.pack}>

            <Pagination
                className={''}
                currentPage={currentPage}
                totalCount={cardPacksTotalCount}
                pageSize={pageCount}
                siblingCount={1}
                setPackPage={setPackPage}
            />
            <select onChange={(e)=>
                setPackPageCount(+e.currentTarget.value)
                }>
               <option selected={pageCount == 3} value={3}>3</option>
               <option selected={pageCount == 5} value={5}>5</option>
               <option selected={pageCount == 10} value={10}>10</option>
            </select>

        </div>
    )
}
