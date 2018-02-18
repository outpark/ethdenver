import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
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
        getWeb3
        .then(results => {
          this.setState({
            web3: results.web3
          })
          console.log("WEB# CONENCTED");
          toast(`Web3 Connected!`, {
            type: "success"
          })
          // Instantiate contract once web3 provided.
        //   this.instantiateContract()
        })
        .catch((err) => {
          console.log('Error finding web3.')
          toast(`Error finding web3.`, {
            type: "error"
          });
        })
    }
    render() {
        return (
            <div className="upload-container">
                <ToastContainer position='top-right' hideProgressBar={true} />
                <Navbar {...this.props}/>
                <UploadForm web3={this.state.web3} />
            </div>
        );
    }
}

export default Upload;
