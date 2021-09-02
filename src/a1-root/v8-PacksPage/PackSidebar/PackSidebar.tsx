import React, {useState} from "react";
import s from "./PackSidebar.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {
    actionsForStateOfMyPackSortDate,
    sortValue
} from "../../common/StateOfMyPackSortDate/StateOfMyPackSortDateReduser";
import MultiRangeSlider from "../../common/MultiRangeSlider/MultiRangeSlider";
import {AppRootStateType} from "../../../app/store";
import {PackDomainType} from "../packReduser";

type PackSidebarPropsType = {}


export const PackSidebar: React.FC<PackSidebarPropsType> = () => {

    const [active, setActive] = useState(false);

    const dispatch = useDispatch()

    const btnMyClassName = active ? `${s.sidebar__btnItem} ${s.active}` : s.sidebar__btnItem
    const btnAllClassName = !active ? `${s.sidebar__btnItem} ${s.active}` : s.sidebar__btnItem

    const maxRange = useSelector<AppRootStateType, number>(state => state.StateOfMyPackSortDate.maxRange);
    const minRange = useSelector<AppRootStateType, number>(state => state.StateOfMyPackSortDate.minRange);


    return (
        <div className={s.sidebar}>
            <h3>Show packs cards</h3>
            <div className={s.sidebar__btn}>
                <button className={btnMyClassName} onClick={() => {
                    dispatch(actionsForStateOfMyPackSortDate.setFlagMyPack(true))
                    setActive(true)

                }}>My
                </button>
                <button className={btnAllClassName} onClick={() => {
                    dispatch(actionsForStateOfMyPackSortDate.setFlagMyPack(false))
                    setActive(false)
                }}>All
                </button>
            </div>
            <p>Number of cards</p>
            <div>
                <MultiRangeSlider
                    min={minRange}
                    max={maxRange}
                    onChange={({ min, max }: { min: number; max: number }) =>{
                        // dispatch(actionsForStateOfMyPackSortDate.setFlagSort(true))
                        console.log(`min = ${min}, max = ${max}`)
                    }

                    }
                />
            </div>

        </div>
    )
}
