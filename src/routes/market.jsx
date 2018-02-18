import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/navbar';
import ArtList from '../components/artList';
import getWeb3 from '../utils/getWeb3';
import Connector from '../utils/connector';
import '../css/market.css';

const defaultDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

class Market extends Component {
    constructor(props){
        super(props);
        this.state={
            artWorks:[]
        }
    }
    formatEvents(events) {
        let artworks = [];
        events.forEach((event) => {
        if(event.args.forSale){
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
        // this.setState({
        //     artWorks:[
        //         {title:"First Art",price:"5", creator:"Artsy Guy",description: defaultDescription, forSale:true,
        //         imgUrl:"https://i1.wp.com/deafnetwork.com/wordpress/wp-content/uploads/2017/05/DigitalArts2017.jpg"},
        //         {title:"Third Art",price:"5.9",creator:"Magic Trick",description:defaultDescription, forSale:true,
        //         imgUrl:"https://d1xfgk3mh635yx.cloudfront.net/sites/default/files/image/featured/1033249-rebelle-2-delivers-realistic-watercolor-tools-digital-artists.jpg"},
        //         {title:"FifthArt",price:"12.0", creator:"David Hockey",description: defaultDescription, forSale:true,
        //         imgUrl:"http://images.artistrunwebsite.com/arwblog/bg_53431487818188.jpg?1487818189"},
        //         {title:"Sixth Art",price:"6.2",creator:"Andy Anthall",description:defaultDescription, forSale:true,
        //         imgUrl:"http://www.tooft.com/wp-content/uploads/2010/11/Digital-Art-Painting.jpg"}
        //     ]
        // })
    }
    render() {
        return (
        <div className="market-container">
            <Navbar {...this.props}/>
            <ArtList web3={this.state.web3} artWorks={this.state.artWorks}/>
        </div>
        );
    }
}

export default Market;
