import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchPack} from "./packReduser";
import {Wrapper} from "../common/StylizedСomponents/Wrapper/Wrapper";
import {PackSidebar} from "./PackSidebar/PackSidebar";
import {Pack} from "./Pack/Pack";

type PackPropsType = {

}


export const PacksPage: React.FC<PackPropsType> = () => {


   const dispatch =  useDispatch()

   useEffect(() => {
      dispatch(fetchPack({pageCount: 100}))
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <Wrapper>
         <PackSidebar/>
         <Pack/>
      </Wrapper>
   )
}
