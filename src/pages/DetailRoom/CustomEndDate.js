import React from 'react'
import { DateInput } from "@progress/kendo-react-dateinputs";


export default function CustomEndDate(props) {
    const style = {
        color: props.value !== null ? "green" : "red",
    };
    return <div className='border-r text-[14px] border-solid border-gray-400 rounded-tl-md w-full p-2 cursor-pointer hover:bg-gray-100'>
        <span style={style} className='text-[12px] uppercase font-semibold'>Ngày trả phòng</span> <br />
        <DateInput {...props} label={undefined} />
    </div>
}
