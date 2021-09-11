import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPack} from "./packReduser";
import {Wrapper} from "../common/StylizedСomponents/Wrapper/Wrapper";
import {PackSidebar} from "./PackSidebar/PackSidebar";
import {Pack} from "./Pack/Pack";
import {AppRootStateType} from "../../app/store";
import {StatusType} from "../../app/appReducer";
import {Preloader} from "../common/Preloader/Preloader";
import {Redirect} from "react-router-dom";
import {PATH} from "../../app/App";
import {actionsForPackPagination} from "../common/Pagination/paginationPackReduser";
import {sortValue} from "../common/StateOfMyPackSortDate/StateOfMyPackSortDateReduser";

type PackPropsType = {}


export const PacksPage: React.FC<PackPropsType> = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLogedIn);
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    const dispatch = useDispatch()


    const pageCount = useSelector<AppRootStateType, number>(state => state.paginationPack.pageCount);
    const currentPage = useSelector<AppRootStateType, number>(state => state.paginationPack.page);
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.paginationPack.cardPacksTotalCount);
    const userId = useSelector<AppRootStateType, string>(state => state.login._id);
    const flagForMyPack = useSelector<AppRootStateType, boolean>(state => state.StateOfMyPackSortDate.myPackState);
    const flagSortData = useSelector<AppRootStateType, boolean>(state => state.StateOfMyPackSortDate.dateState);
    const flagSortValueData = useSelector<AppRootStateType, typeof sortValue>(state => state.StateOfMyPackSortDate.sortValue);

    const maxRange = useSelector<AppRootStateType, number>(state => state.StateOfMyPackSortDate.valueRange[1]);
    const minRange = useSelector<AppRootStateType, number>(state => state.StateOfMyPackSortDate.valueRange[0]);
    const sortFlag = useSelector<AppRootStateType, boolean>(state => state.StateOfMyPackSortDate.sortState);
    const searchFlag = useSelector<AppRootStateType, boolean>(state => state.StateOfMyPackSortDate.searchFlag);
    const nameSearch = useSelector<AppRootStateType, string>(state => state.StateOfMyPackSortDate.nameSearch);

    const setPackPage = (val: number) => {
        dispatch(actionsForPackPagination.setPackPage(val))
    }
    const setPackPageCount = (val: number) => {
        dispatch(actionsForPackPagination.setPackPageCount(val))
    }


    useEffect(() => {
        dispatch(fetchPack({
            pageCount: pageCount,
            page: currentPage,
            user_id: flagForMyPack ? userId : undefined,
            sortPacks: flagSortData ? flagSortValueData : undefined,
            min: sortFlag ? minRange : undefined,
            max: sortFlag ? maxRange : undefined,
            packName: searchFlag ? nameSearch : undefined
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, pageCount, flagForMyPack, flagSortData, flagSortValueData, sortFlag, minRange, maxRange, searchFlag, nameSearch])

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
                setPackPageCount={setPackPageCount}
                setPackPage={setPackPage}
            />
        </Wrapper>
    )
}
