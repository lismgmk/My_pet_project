import React, {useEffect} from "react";
import s from "./Card.module.scss";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchCard} from "./cardsReduser";
import {AppRootStateType} from "../../app/store";
import {StatusType} from "../../app/appReducer";
import {Preloader} from "../common/Preloader/Preloader";
import {Wrapper} from "../common/StylizedСomponents/Wrapper/Wrapper";
import {TableCardList} from "./TableCardList/TableCardList";
import {PackDomainType} from "../v8-PacksPage/packReduser";
import {SearchField} from "../common/SearchField/SearchField";
import {PATH} from "../../app/App";
import {PaginationWrapper} from "../common/Pagination/PaginationWrapper";
import {actionsForCardPagination} from "../common/Pagination/paginationCardReduser";

type CardPropsType = {}

export const Card: React.FC<CardPropsType> = () => {

    const {id} = useParams<{ id: string }>()
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    const pack = useSelector<AppRootStateType, PackDomainType[]>(state => state.pack)
    const title = pack.filter(t => id === t._id)


    const pageCountCard = useSelector<AppRootStateType, number>(state => state.paginationCard.pageCount);
    const currentPageCard = useSelector<AppRootStateType, number>(state => state.paginationCard.page);
    const cardPacksTotalCountCard = useSelector<AppRootStateType, number>(state => state.paginationCard.cardsTotalCount);


    const setCardPage = (val: number) => {
        dispatch(actionsForCardPagination.setCardPage(val))
    }
    const setCardPageCount = (val: number) => {
        dispatch(actionsForCardPagination.setCardPageCount(val))
    }


    useEffect(() => {
        dispatch(fetchCard({
            cardsPack_id: id,
            page: currentPageCard,
            pageCount: pageCountCard
        }))
    }, [currentPageCard, pageCountCard, id, dispatch])


    return (
        <Wrapper>
            {status === 'loading' && <Preloader/>}
            <div className={s.card}>

                <h1><Link to={PATH.PET_PACK}>&#10229;</Link>{title[0].name}</h1>
                <SearchField placeholder='Search'/>
                <PaginationWrapper
                    cardPacksTotalCount={cardPacksTotalCountCard}
                    currentPage={currentPageCard}
                    pageCount={pageCountCard}
                    setPackPageCount={setCardPageCount}
                    setPackPage={setCardPage}
                />
                <TableCardList id={id}/>

            </div>
        </Wrapper>
    )
}
