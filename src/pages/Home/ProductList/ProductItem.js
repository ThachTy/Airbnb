import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MAX_LENGTH } from '../../../utils/constants';

export default function ProductItem({ data }) {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const images = [1, 2, 3];

    const convertStr = (str) => {
        if (str.length > MAX_LENGTH) return str.slice(0, MAX_LENGTH) + '...';
        return str;
    }

    const { id, hinhAnh, tenPhong, giaTien } = data
    return (
        <div className='productItem__wrapper'>
            <div className="productItem__carousel">
                <Slider {...settings}>
                    {images.map((item) => {
                        return (
                            <div key={`image-${item}`} className='productItem__carousel-item'>
                                <img src={hinhAnh} className='productItem__carousel-item-img' />
                            </div>
                        )
                    })}
                </Slider>
            </div>
            <div className="productItem__info">
                <p>{convertStr(tenPhong)}</p>
                <p>$<span>{giaTien}</span> /đêm</p>
            </div>
        </div>
    )
}
