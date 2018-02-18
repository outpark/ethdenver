import React from 'react';
import Slider from 'react-slick';

import '../css/carousel.css'

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}

class Carousel extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            overlay1 : true
        }
    }
    turnOnOff() {
        if(this.state.overlay1){
            document.getElementById("overlay").style.display = "none";
        }else{
            document.getElementById("overlay").style.display = "block";
        }
        this.setState(
            {overlay1: !this.state.overlay1}
        );
    }
    render() {
        // const settings = {
        //     dots: true,
        //     infinite: true,
        //     fade: true,
        //     slidesToShow: 1,
        //     slidesToScroll: 1,
        //     vertical: true,
        //     speed: 700,
        //     autoplaySpeed: 2000,
        //   };
        const settings = {
            dots: true,
            // lazyLoad: true,
            fade: true,
            infinite: true,
            speed: 700,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
            vertical: true,
            autoplay: true,
            autoplaySpeed: 3500
        };

        return (
            <div className="carousel-container">
                <div id="overlay" onClick={this.turnOnOff.bind(this)}>
                <div id="text">Start Tokenizing Your Art Today</div>
                </div>
              <Slider {...settings}>
                <div onClick={this.turnOnOff.bind(this)}><img src={'https://ipfs.io/ipfs/QmTZXAv7wPahM49RaP6Rrx4EvFzFebJfTgMsppXp3SHMy5'} alt="art work"/></div>
                <div onClick={this.turnOnOff.bind(this)}><img src={'https://ipfs.io/ipfs/QmYyGN8VvZ9ZwSowLjGCS8eGFZ9MZTRPjyJt6rEAbKeUrA'} alt="art work"/></div>
                <div onClick={this.turnOnOff.bind(this)}><img src={'https://ipfs.io/ipfs/Qma5LSk7nvKm9mxo3n7sZhkpS2ihE6xBYDjGzkZ9oEk4q5'} alt="art work"/></div>
                <div onClick={this.turnOnOff.bind(this)}><img src={'https://ipfs.io/ipfs/QmR28BGVouJYbSV11esboe5dfFKMkVEWTBB6cVqnmokiN2'} alt="art work"/></div>
                <div onClick={this.turnOnOff.bind(this)}><img src={'https://ipfs.io/ipfs/QmNNMJVP6NyExRP8j4NQCdGxkb9bwehjR7eg97fRPWDSmV'} alt="art work"/></div>
              </Slider>
              
            </div>
        )
    }
    
}

export default Carousel;