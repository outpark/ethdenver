import IpfsApi from 'ipfs-api';
import ContractAbi from './contract-abi.json';
import Buffer from 'buffer';
const toBuffer = require('blob-to-buffer');

// connect to ipfs daemon API server
var ipfs = IpfsApi('localhost', '5001', {protocol: 'http'}) // leaving out the arguments will default to these values

const defaultAddr = "0xb20a5449f23fb5198234c20935442c55e3faa9ae";

const createArtwork = function(contract, coinbase, title, price, url, forSale) {
    console.log("Creating artwork...");
    let combined = title + "@" +url;
    contract.createArtwork(
        title, combined, price, forSale,{gas:600000},
        function(err, result) {
        console.log("Artwork created");
        if(err)
            throw(err);
    });
    
}

  export default class Connector {
    web3Contract = {}

    static getContract(web3) {
        console.log(web3);
        if(!Object.hasOwnProperty(this.web3Contract)){
            this.web3Contract = web3.eth.contract(ContractAbi.abi).at(defaultAddr);
        }
        return this.web3Contract;
    }

    static getMyAccount(web3) {
        return web3.eth.defaultAccount;
    }
    

    static fetchAllArtworks(contract) {
        return new Promise(function(resolve, reject) {
            contract.newArtwork({}, {fromBlock: 0, toBlock: 'latest'}).get((error, eventResult) => {
                if (error){
                    console.log('Error in myEvent event handler: ' + error);
                    reject(error);
                }
                else{
                    return resolve(eventResult);
                }
            })
        })
    }

    static fetchForSaleArtworks() {

    }

    static uploadAndCreateArt(file, contract, coinbase, artObj) {
        var blob = new Blob([file], {type : file.type});
        toBuffer(blob, function (err, buffer) {
            if (err) throw err
            buffer[0] // => 1
            buffer.readUInt8(1) // => 2
            console.log(buffer);
            ipfs.files.add(buffer, (err, result) => { // Upload buffer to IPFS
                if(err) {
                  console.error(err)
                  throw err;
                }
                let url = `https://ipfs.io/ipfs/${result[0].hash}`
                console.log(`Url --> ${url}`)
                return createArtwork(contract, coinbase, artObj.title, artObj.price, url, artObj.forSale)
            })
          })
    }
    static purchaseArtwork(contract, coinbase) {

    }
}
  