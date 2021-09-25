import React, {useState} from "react";
import s from "./PackSidebar.module.scss";
import {useDispatch} from "react-redux";
import {
    actionsForStateOfMyPackSortDate,
} from "../../common/StateOfMyPackSortDate/StateOfMyPackSortDateReduser";
import MultiRangeSlider from "../../common/MultiRangeSlider/MultiRangeSlider";

type PackSidebarPropsType = {}


export const PackSidebar: React.FC<PackSidebarPropsType> = () => {

    const [active, setActive] = useState(false);

    const dispatch = useDispatch()

    const btnMyClassName = active ? `${s.sidebar__btnItem} ${s.active}` : s.sidebar__btnItem
    const btnAllClassName = !active ? `${s.sidebar__btnItem} ${s.active}` : s.sidebar__btnItem

    return (
        <div className={s.sidebar}>

            <h3>Show packs cards</h3>
            <div className={s.sidebar__btn}>
                <button className={btnMyClassName} onClick={() => {
                    console.log(active)
                    setActive(true)
                    dispatch(actionsForStateOfMyPackSortDate.setFlagMyPack(true))


                }}>My
                </button>
                <button className={btnAllClassName} onClick={() => {
                    console.log(active)
                    setActive(false)
                    dispatch(actionsForStateOfMyPackSortDate.setFlagMyPack(false))

                }}>All
                </button>
            </div>
            <p>Number of cards</p>

            <div className={s.sidebarRange}>
                <MultiRangeSlider
                    rtl={false}
                />
            </div>

        </div>
    )
}
