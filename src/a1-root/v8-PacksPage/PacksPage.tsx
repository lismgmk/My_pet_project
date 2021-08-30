import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {fetchPack, PackDomainType} from "./packReduser";
import {Wrapper} from "../common/StylizedСomponents/Wrapper/Wrapper";
import {PackSidebar} from "./PackSidebar/PackSidebar";
import {Pack} from "./Pack/Pack";

type PackPropsType = {

}


export const PacksPage: React.FC<PackPropsType> = () => {

   const pack = useSelector<AppRootStateType, PackDomainType[]>(state => state.pack)
   const dispatch =  useDispatch()

   useEffect(() => {
      dispatch(fetchPack({pageCount: 10}))
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   console.log(pack)
   return (
      <Wrapper>
         <PackSidebar/>
         <Pack/>
      </Wrapper>
   )
}
