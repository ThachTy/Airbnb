import React, { useEffect, useState } from 'react'
import './ProductList.scss'
import { useQuery } from 'react-query';
import { phongService } from '../../../services';
import ProductItem from './ProductItem';

export default function ProductList() {

    const products = useQuery({
        queryKey: ['queryProduct'],
        queryFn: () => phongService.getRoomList()
    })

    console.log(products?.data?.data?.content);



    return (
        <div className='productList__wrapper'>
            {products?.data?.data?.content.map((item) => {
                return <ProductItem data={item} key={item.id} />
            })}
        </div>
    )
}
