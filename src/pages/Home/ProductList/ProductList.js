import React, { useEffect } from 'react'
import './ProductList.scss'
import { useQuery } from 'react-query';

export default function ProductList() {
    const [products, setproducts] = useState([]);

    const query = useQuery({
        queryKey: ['queryProduct'],
        queryFn: () => 
    })

    return (
        <div className='productList__wrapper'>
            daw
        </div>
    )
}
