import React, { useEffect, useState } from 'react'
import './ProductList.scss'
import { useQuery } from 'react-query';
import { phongService } from '../../../services';
import ProductItem from './ProductItem';

export default function ProductList() {

    const tempParam = false; // sau này sẽ nhận giá trị từ header

    const products = useQuery({
        queryKey: ['queryProduct', tempParam], // queryKey: nếu nhận vào 1 param, khi param có sự thay đổi => trigger queryFn ~ useEffect
        //do header có thanh search/ lọc location => mỗi lần lọc => trigger queryFn dưới => cần 1 biến để tempParam trigger
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
