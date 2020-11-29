import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import PropTypes from 'prop-types'

export const ProductInfoCarousel = (props) => {
    const { images } = props
    return (
        <Carousel width='100%' showArrows={false} infiniteLoop={true} transitionTime={400} autoPlay={true} showStatus={false} dynamicHeight={true} showIndicators={false}  style={{ }} >
            {images && images.map((img, index) => 
                    <img src={img} key={index} width= '20%' alt={`Image${index} alt text`}/>
            )}
        </Carousel>
    )
}

ProductInfoCarousel.propTypes = {
    images: PropTypes.array
}

export default ProductInfoCarousel
