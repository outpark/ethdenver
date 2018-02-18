import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../components/navbar';
import Carousel from '../components/carousel';
import ArtList from '../components/artList';
import getWeb3 from '../utils/getWeb3';
import Connector from '../utils/connector';

// import 'react-toastify/dist/ReactToastify.min.css';
import '../css/dashboard.css';
const defaultDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      web3: null,
      artWorks:[]
    }
  }
    //   this.setState({
    //     artWorks:[
    //         {title:"First Art",price:"5", creator:"Artsy Guy",description: defaultDescription, forSale:true,
    //         imgUrl:"https://i1.wp.com/deafnetwork.com/wordpress/wp-content/uploads/2017/05/DigitalArts2017.jpg"},
    //         {title:"Second Art",price:"3.2",creator:"Awesome Creator",description:defaultDescription, forSale:false,
    //         imgUrl:"https://www.creativegaga.com/wp-content/uploads/2016/12/ShinjoP_Feature-1200x675.jpg"},
    //         {title:"Third Art",price:"5.9",creator:"Magic Trick",description:defaultDescription, forSale:true,
    //         imgUrl:"https://d1xfgk3mh635yx.cloudfront.net/sites/default/files/image/featured/1033249-rebelle-2-delivers-realistic-watercolor-tools-digital-artists.jpg"},
    //         {title:"Fourth Art",price:"1.23",creator:"Jackson Potluck",description:defaultDescription, forSale:false,
    //         imgUrl:"https://static.boredpanda.com/blog/wp-content/uploads/2017/02/IMG_20170205_220039_508-58a0129a23ada__880.jpg"},
    //         {title:"FifthArt",price:"12.0", creator:"David Hockey",description: defaultDescription, forSale:true,
    //         imgUrl:"http://images.artistrunwebsite.com/arwblog/bg_53431487818188.jpg?1487818189"},
    //         {title:"Sixth Art",price:"6.2",creator:"Andy Anthall",description:defaultDescription, forSale:true,
    //         imgUrl:"http://www.tooft.com/wp-content/uploads/2010/11/Digital-Art-Painting.jpg"}
    //     ]
    // })
  componentWillMount() {
    
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      console.log("WEB# CONENCTED");
      toast(`Web3 Connected!`, {
        type: "success"
      });
      (async () => {
        try {
          let contract = await Connector.getContract(results.web3, "0xaa95173df80abf6ff745d449b187c0374639151d");
          Connector.fetchAllArtworks(contract).then((results) => {
            console.log(results);
          }).catch((err) => {
            console.log(err);
          });
        }catch(err){
          console.log(err);
        }
      })()
      
      // Instantiate contract once web3 provided.
      // this.instantiateContract()
      
    })
    .catch((err) => {
      console.log('Error finding web3.');
      toast(`Error finding web3. Please connect to Metamask.`, {
        type: "error"
      });
    })
  }

  render() {
    return (
      <div className="Dashboard">
        <ToastContainer position='top-right' hideProgressBar={true} />
        <Navbar {...this.props}/>
        <Carousel />
        <ArtList web3={this.state.web3} artWorks={this.state.artWorks}/>
      </div>
    );
  }
}

export default Dashboard;
