import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import PropTypes from 'prop-types'

export const ProductInfoCarousel = (props) => {
    const { images } = props
    return (
        <Carousel width='100%' showArrows={false} infiniteLoop={true} transitionTime={400} autoPlay={true} showStatus={false} dynamicHeight={true} showIndicators={false}  style={{ }} >
            {images && images.map(img => 
                <div>
                    <img src={img} width= '20%' alt='alternate text here'  />
                    <p className="legend">Quick Buy</p>
                </div>
            )}
        </Carousel>
    )
}

ProductInfoCarousel.propTypes = {
    images: PropTypes.array
}



export default ProductInfoCarousel
