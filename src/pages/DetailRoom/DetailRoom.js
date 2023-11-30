import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { phongService } from '../../services';

export default function DetailRoom() {
    const { idRoom } = useParams();

    const detailRoom = useQuery({
        queryKey: ['roomDetail'],
        queryFn: () => phongService.getDetailRoom(idRoom),
    })

    console.log('roomDetail', detailRoom?.data?.data?.content)

    return (
        <div>
            <h1></h1>
        </div>
    )
}
