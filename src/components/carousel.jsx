import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import '../css/carousel.css'

class Carousel extends React.Component {
    
    render() {
        const settings = {
            dots: true,
            className: 'center',
            centerMode: true,
            // lazyLoad: true,
            fade: true,
            infinite: true,
            speed: 700,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2,
            autoplay: true,
            autoplaySpeed: 3000
        };
        return (
            <div className="carousel-container">
              <Slider {...settings}>
                <div><img src={'https://www-dev.brookdalecc.edu/wp-content/uploads/2015/02/digital-arts.jpg'} /></div>
                <div><img src={'https://static.boredpanda.com/blog/wp-content/uploads/2017/02/IMG_20170114_222025_931-58a01296a1b60__880.jpg'} /></div>
                <div><img src={'https://cdn.segmentnext.com/wp-content/uploads/2015/07/Minecraft-Deep-Sea-1.jpg'} /></div>
                <div><img src={'https://cdt.nd.edu/assets/149874/original/digital_arts.jpg'} /></div>
              </Slider>
            </div>
        )
    }
    
}

export default Carousel;