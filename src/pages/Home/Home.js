import React from 'react'
import { FilterBar } from './FilterBar'
import { ProductList } from './ProductList'

export default function Home() {
    return (
        <div className="home__wrapper py-8">
            <FilterBar />
            <ProductList />
        </div>
    )
}
