import React from 'react'
import { filter } from '../../../utils/constants/filterBar'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './FilterBar.scss'

export default function FilterBar() {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            {filter.map((item, index) => {
                return (
                    <div key={index} className='list-filter__item'>
                        <img src={item.icon} alt="" width={24} height={24} className='object-contain' />
                        <p>{item.desc}</p>
                    </div>
                )
            })}
        </Slider>
    )
}
