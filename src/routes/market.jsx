import React, { Component } from 'react';

import Navbar from '../components/navbar';
import ArtList from '../components/artList';

import '../css/market.css';

class Market extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
        <div className="market-container">
            <Navbar {...this.props}/>
            <ArtList />
        </div>
        );
    }
}

export default Market;
