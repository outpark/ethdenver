import React, { Component } from 'react';

import Navbar from '../components/navbar';
import ArtList from '../components/artList';

import '../css/collections.css';

class Collections extends Component {
    constructor(props){
        super(props);
        this.state={
            artWorks:[]
        }
    }
    componentWillMount(){
        
    }
    render() {
        return (
        <div className="collections-container">
            <Navbar {...this.props}/>
            <ArtList />
        </div>
        );
    }
}

export default Collections;
