import { Popup } from '@progress/kendo-react-popup'
import React, { useEffect, useRef, useState } from 'react'

export default function CustomPopup(props) {
    const { show, ...rest } = props;
    console.log('props', props)
    const anchor = useRef(null);
    const [myshow, setMyshow] = useState(false);

    const onClick = () => {
        console.log('handle click')
        setMyshow(!myshow);
    };

    console.log('show btn', myshow)

    return (
        <div>
            <button
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                onClick={onClick}
                ref={anchor}
            >
                {show ? "Hide" : "Show"}
            </button>
            <Popup
                {...rest}
                anchorAlign={{
                    horizontal: "center",
                    vertical: "bottom",
                }}
                popupAlign={{
                    horizontal: "center",
                    vertical: "top",
                }}
                show={myshow}
                anchor={anchor.current}
            />
        </div>
    )
}
