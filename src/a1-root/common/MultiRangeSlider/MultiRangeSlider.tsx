import * as React from 'react';
import {Range, getTrackBackground} from "react-range";
import {useDispatch} from "react-redux";
import {actionsForStateOfMyPackSortDate} from "../StateOfMyPackSortDate/StateOfMyPackSortDateReduser";
import useDebounceForRange from "../../../hook/useDebounceForRange";
import {useEffect} from "react";


const MultiRangeSlider: React.FC<{ rtl: boolean }> = ({rtl}) => {

    const dispatch = useDispatch()

    const STEP = 1;
    const MIN = 0;
    const MAX = 30;

    const [values, setValues] = React.useState([0, 10]);

    const debouncedRangeMax = useDebounceForRange(values, 1500);

    useEffect(() => {
        dispatch(actionsForStateOfMyPackSortDate.setFlagSort(true))
        dispatch(actionsForStateOfMyPackSortDate.valueRange(values))
    },[debouncedRangeMax])


    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}
        >
            <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                rtl={rtl}
                onChange={(values) => {
                    setValues(values);

                }}
                renderTrack={({props, children}) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            height: '36px',
                            display: 'flex',
                            width: '100%'
                        }}
                    >
                        <div
                            ref={props.ref}
                            style={{
                                height: '5px',
                                width: '185px',
                                borderRadius: '4px',
                                background: getTrackBackground({
                                    values,
                                    colors: ['#9A91C8', '#21268F', '#9A91C8'],
                                    min: MIN,
                                    max: MAX,
                                    rtl
                                }),
                                alignSelf: 'center'
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({index, props, isDragged}) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: 16,
                            width: 16,
                            borderRadius: '50%',
                            backgroundColor: '#FFF',
                            border: '4px solid #21268F',
                            boxSizing: 'border-box',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0px 2px 6px #AAA',
                        }}
                    >
                        <div
                            style={{
                                height: '8px',
                                width: '8px',
                                borderRadius: '50%',
                                backgroundColor: isDragged ? '#548BF4' : '#FFF',

                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: '-28px',
                                color: '#fff',
                                fontSize: '14px',
                                fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif',
                                padding: '4px',
                                borderRadius: '4px',
                                backgroundColor: '#21268F'
                            }}
                        >
                            {values[index].toFixed(0)}

                        </div>
                    </div>

                )}
            />
        </div>
    );
};

export default MultiRangeSlider;