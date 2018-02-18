import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/navbar';
import ArtList from '../components/artList';
import getWeb3 from '../utils/getWeb3';
import Connector from '../utils/connector';

import '../css/collections.css';
const defaultDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

class Collections extends Component {
    constructor(props){
        super(props);
        this.state={
            artWorks:[],
            myAccount:""
        }
    }
    formatEvents(events) {
        let artworks = [];
        events.forEach((event) => {
            if(this.state.myAccount === event.args.originalCreator){
                let pair = event.args.title.split('@');
                console.log(event);
                artworks.push({
                    title: pair[0],
                    imgUrl: pair[1],
                    creator:event.args.originalCreator,
                    price: event.args.price.c[0]+(0.1*event.args.price.s)+(0.01*event.args.price.e),
                    description:defaultDescription,
                    forSale: event.args.forSale
                });
            }
        });
        console.log(artworks);
        this.setState({
          artWorks: artworks
        });
      }
    componentWillMount(){
        getWeb3
        .then(results => {
            this.setState({
                web3: results.web3
            })
            toast(`Web3 Connected!`, {
                type: "success"
            });
            this.setState({
                myAccount: Connector.getMyAccount(results.web3)
            });
            (async () => {
                try {
                let contract = await Connector.getContract(results.web3);
                
                Connector.fetchAllArtworks(contract).then((results) => {
                    console.log(results);
                    this.formatEvents(results);
                }).catch((err) => {
                    console.log(err);
                });
                }catch(err){
                console.log(err);
                }
            })()
            })
            .catch((err) => {
            toast(`Error finding web3. Please connect to Metamask.`, {
                type: "error"
            });
        })
    }
    render() {
        return (
            <div className="collections-container">
                <Navbar {...this.props}/>
                <ArtList web3={this.state.web3} artWorks={this.state.artWorks}/>
            </div>
        );
    }
}

export default Collections;
