import React, { Component } from 'react';

import Navbar from '../components/navbar';
import UploadForm from '../components/uploadForm';
import '../css/upload.css';
import getWeb3 from '../utils/getWeb3';

class Upload extends Component {
    constructor(props){
        super(props);
        this.state = {
            web3: null
        }
    }
    componentDidMount() {
        console.log(getWeb3);
        getWeb3
        .then(results => {
          this.setState({
            web3: results.web3
          })
          console.log("WEB# CONENCTED")
          // Instantiate contract once web3 provided.
        //   this.instantiateContract()
        })
        .catch(() => {
          console.log('Error finding web3.')
          alert('Error finding web3.');
        })
    }
    render() {
        return (
            <div className="upload-container">
                <Navbar {...this.props}/>
                <UploadForm web3={this.state.web3} />
            </div>
        );
    }
}

export default Upload;
