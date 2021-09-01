import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPack, PackDomainType} from "./packReduser";
import {Wrapper} from "../common/StylizedСomponents/Wrapper/Wrapper";
import {PackSidebar} from "./PackSidebar/PackSidebar";
import {Pack} from "./Pack/Pack";
import {AppRootStateType} from "../../app/store";
import {StatusType} from "../../app/appReducer";
import {Preloader} from "../common/Preloader/Preloader";
import {Redirect} from "react-router-dom";
import {PATH} from "../../app/App";
import {InitialPaginationStateType} from "../utills/Pagination/paginationPackReduser";

type PackPropsType = {

}


export const PacksPage: React.FC<PackPropsType> = () => {
   const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);
   const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
   const dispatch =  useDispatch()


   const pageCount = useSelector<AppRootStateType, number>(state => state.paginationPack.pageCount);
   const currentPage = useSelector<AppRootStateType, number>(state => state.paginationPack.page);
   const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.paginationPack.cardPacksTotalCount);

   useEffect(() => {
      dispatch(fetchPack({pageCount: pageCount, page: currentPage}))
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currentPage, pageCount])

   if (!isLoggedIn) {
      return <Redirect to={PATH.PET_LOGIN}/>
   }

   return (
      <Wrapper>
         {status === 'loading' && <Preloader/>}
         <PackSidebar/>
         <Pack
             cardPacksTotalCount={cardPacksTotalCount}
             pageCount={pageCount}
             currentPage={currentPage}
         />
      </Wrapper>
   )
}
