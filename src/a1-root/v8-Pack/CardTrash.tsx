import React, {useEffect, useState} from "react";
import {Pagination} from "../utills/Pagination/Pagination";
import {packAPI} from "../../api/pack-api/packAPI";

type CardPropsType = {}

export const CardTrash: React.FC<CardPropsType> = () => {
    const [currentPage, setCurrentPage] = useState(3);
    const [totalCount, setTotalCount] = useState(1);
    const [idCount, setIdCount] = useState([]);

useEffect(
    ()=>{
       packAPI.getCardsPack({pageCount: 8, page: currentPage})
           .then(data => {console.log(data)
              setTotalCount(data.data.cardPacksTotalCount)
              // @ts-ignore
                  setIdCount(data.data.cardPacks)

           }
           )
    },[currentPage]
)

    return (
        <div>



           <h3> Колоды{totalCount}</h3>
           {idCount && idCount.map(({_id, user_name})=>{

              return <div key={_id}>
                 {user_name}
              </div>
           })}


            <Pagination currentPage={currentPage}
                        totalCount={totalCount}
                        pageSize={10}
                        onPageChange={setCurrentPage}
                        className="pagination-bar"
                        siblingCount={2}
            />
        </div>
    )
}
