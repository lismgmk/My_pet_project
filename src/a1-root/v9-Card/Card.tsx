import React, {useCallback, useEffect, useState} from "react";
import s from "./Card.module.scss";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {CardDomainType, createCard, fetchCard} from "./cardsReduser";
import {AppRootStateType} from "../../app/store";
import {StatusType} from "../../app/appReducer";
import {Preloader} from "../common/Preloader/Preloader";
import {Wrapper} from "../common/StylizedСomponents/Wrapper/Wrapper";
import {TableCardList} from "./TableCardList/TableCardList";
import {PackDomainType} from "../v8-PacksPage/packReduser";
import {PATH} from "../../app/App";
import {PaginationWrapper} from "../common/Pagination/PaginationWrapper";
import {actionsForCardPagination} from "../common/Pagination/paginationCardReduser";
import {SearchBlock} from "../common/StylizedСomponents/SearchBlock/SearchBlock";
import {InputField} from "../common/InputField/InputField";
import global from "../../style/global.module.scss";
import {Button} from "../common/Button/Button";
import {Modal} from "../common/Modal/Modal";

type CardPropsType = {}

export const Card: React.FC<CardPropsType> = React.memo(() => {

   const {id} = useParams<{ id: string }>();
   const dispatch = useDispatch();
   const status = useSelector<AppRootStateType, StatusType>(state => state.app.status);
   const pack = useSelector<AppRootStateType, PackDomainType[]>(state => state.pack);
   const me = useSelector<AppRootStateType, string>(state => state.login._id);
   const card = useSelector<AppRootStateType, CardDomainType[]>(state => state.cards[id]);
   const [addCardModal, setAddCardModal] = useState(false);
   const [newCardQuestion, setNewCardQuestion] = useState('');
   const [newCardAnswer, setNewCardAnswer] = useState('');
   const title = pack.filter(t => id === t._id);

   const pageCountCard = useSelector<AppRootStateType, number>(state => state.paginationCard.pageCount);
   const currentPageCard = useSelector<AppRootStateType, number>(state => state.paginationCard.page);
   const cardPacksTotalCountCard = useSelector<AppRootStateType, number>(state => state.paginationCard.cardsTotalCount);

   const setCardPage = useCallback((val: number) => {
      dispatch(actionsForCardPagination.setCardPage(val))
   }, [dispatch]);
   const setCardPageCount = useCallback((val: number) => {
      dispatch(actionsForCardPagination.setCardPageCount(val))
   }, [dispatch]);

   const fetchCardParams = useCallback(() => {
      return {
         cardsPack_id: id,
         page: currentPageCard,
         pageCount: pageCountCard
      }
   }, [currentPageCard, id, pageCountCard])
   const searchByName = () => {  //name: string передать, в тело ф-ии нужно диспатчить те экшены которые ищут по имени
      return false
   }
   const setNewCardHandler = () => {
      dispatch(createCard({
               cardsPack_id: id,
               question: newCardQuestion,
               answer: newCardAnswer,
               type: 'card'
            },
            fetchCardParams())
      )
      setAddCardModal(false);
      setNewCardAnswer('');
      setNewCardQuestion('');
   }

   // useEffect(() => {
   //    dispatch(fetchCard(fetchCardParams()));
   // }, [currentPageCard, pageCountCard, id, dispatch, fetchCardParams])


   return (
      <Wrapper>
         {status === 'loading' && <Preloader/>}
         <div className={s.card}>

            <h1><Link to={PATH.PET_PACK}>&#10229;</Link>{title.length ? title[0].name : 'Card Name'}</h1>
            <SearchBlock
               buttonName='Add new card'
               isModalOpen={setAddCardModal}
               debounceCallback={searchByName}
               btnVisible={card?.length ? me !== card[0].user_id : false}
            />

            <TableCardList id={id}/>
            <PaginationWrapper
               cardPacksTotalCount={cardPacksTotalCountCard}
               currentPage={currentPageCard}
               pageCount={pageCountCard}
               setPackPageCount={setCardPageCount}
               setPackPage={setCardPage}
            />
         </div>
         <Modal modalActive={addCardModal} setModalActive={setAddCardModal}>
            <div className={s.card__modal}>
               <h2>Add new pack</h2>
               <InputField
                  value={newCardQuestion}
                  onChange={e => setNewCardQuestion(e.currentTarget.value)}
                  label='Question'
               />
               <InputField
                  value={newCardAnswer}
                  onChange={e => setNewCardAnswer(e.currentTarget.value)}
                  label='Answer'
               />
               <div className={global.modal__btn}>
                  <Button
                     width={120}
                     rounded
                     color='light-blue'
                     onClick={() => setAddCardModal(false)}
                  >Cancel</Button>
                  <Button
                     onClick={setNewCardHandler}
                     width={120}
                     rounded
                     color='dark-blue'
                  >Save</Button>
               </div>
            </div>
         </Modal>
      </Wrapper>
   )
})
