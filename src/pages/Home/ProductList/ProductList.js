import React, { useEffect, useState } from 'react'
import './ProductList.scss'
import { useQuery } from 'react-query';
import { phongService } from '../../../services';

export default function ProductList() {
    const [products, setproducts] = useState([]);

    const query = useQuery({
        queryKey: ['queryProduct'],
        queryFn: () => phongService.getRoomList()
    })

    console.log(query);

    return (
        <div className='productList__wrapper'>
            daw
        </div>
    )
}
