import React, { Component } from 'react';

import Navbar from '../components/navbar';

import '../css/artists.css';

class Artists extends Component {
    constructor(props){
        super(props);
    }
    render() {
        console.log("INSIDE ARTISTS")
        return (
        <div>
            <Navbar {...this.props}/>
        </div>
        );
    }
}

export default Artists;
