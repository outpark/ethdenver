import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from '../components/navbar';
import Carousel from '../components/carousel';
import ArtList from '../components/artList';
import getWeb3 from '../utils/getWeb3';

import '../css/dashboard.css';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      web3: null
    }
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  render() {
    return (
      <div className="Dashboard">
        <Navbar {...this.props}/>
        <Carousel />
        <ArtList />
      </div>
    );
  }
}

export default Dashboard;
