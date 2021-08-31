import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPack} from "./packReduser";
import {Wrapper} from "../common/StylizedСomponents/Wrapper/Wrapper";
import {PackSidebar} from "./PackSidebar/PackSidebar";
import {Pack} from "./Pack/Pack";
import {AppRootStateType} from "../../app/store";
import {StatusType} from "../../app/appReducer";
import {Preloader} from "../common/Preloader/Preloader";

type PackPropsType = {

}


export const PacksPage: React.FC<PackPropsType> = () => {

   const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
   const dispatch =  useDispatch()

   useEffect(() => {
      dispatch(fetchPack({pageCount: 100}))
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <Wrapper>
         {status === 'loading' && <Preloader/>}
         <PackSidebar/>
         <Pack/>
      </Wrapper>
   )
}
