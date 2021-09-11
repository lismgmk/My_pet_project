import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../app/App';
import {actionsForApp, StatusType} from '../../app/appReducer';
import {AppRootStateType} from '../../app/store';
import {Button} from '../common/Button/Button';
import {Preloader} from '../common/Preloader/Preloader';
import {AuthModal} from '../common/StylizedСomponents/AuthModal/AuthModal';
import style from './Page_404.module.scss'

function Page404() {



    return (
       <></>
    );
}

export default Page404;


