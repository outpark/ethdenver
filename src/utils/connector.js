import IpfsApi from 'ipfs-api';
import ContractAbi from './contract-abi.json';
import Buffer from 'buffer';
const toBuffer = require('blob-to-buffer');

// connect to ipfs daemon API server
var ipfs = IpfsApi('localhost', '5001', {protocol: 'http'}) // leaving out the arguments will default to these values

// const uploadBlob = (blob) => {
//     var reader = new FileReader();
//     console.log(reader);
//     var result = new Promise((resolve, reject) => {
//       reader.onload = async () => {
//         var result = await ipfs.files.add([Buffer.from(reader.result)]);
//         resolve(result[0].hash);
//       };
//     });
//     reader.readAsArrayBuffer(blob);
//     return result;
// }

const createArtwork = function(contract, coinbase, title, price, url, forSale) {
    console.log("Creating artwork...");
    console.log(contract);
    let combined = title + "@" +url;
    contract.createArtwork(
        title, combined, price, forSale,{gas:600000},
        function(err, result) {
        console.log("Artwork created");
        console.log(err, result);
        if(err)
            throw(err);
    });
    
}

  export default class Connector {
    web3Contract = {}

    static getContract(web3, addr) {
        console.log(web3);
        if(!Object.hasOwnProperty(this.web3Contract)){
            this.web3Contract = web3.eth.contract(ContractAbi.abi).at(addr);
        }
        return this.web3Contract;
    }

    static fetchAllArtworks() {
        this.web3Contract.newArtwork({}, {fromBlock: 0, toBlock: 'latest'}).get((error, eventResult) => {
            if (error)
              console.log('Error in myEvent event handler: ' + error);
            else{
                console.log(eventResult)
                return eventResult;
            }
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
    // static uploadImage(file){
    //     // console.log(file);
    //     // console.log(ipfs);
    //     // var hash = await uploadBlob(file);
    //     // console.log(hash);
    //     var blob = new Blob([file], {type : file.type});
    //     toBuffer(blob, function (err, buffer) {
    //         if (err) throw err
    //         buffer[0] // => 1
    //         buffer.readUInt8(1) // => 2
    //         console.log(buffer);
    //         ipfs.files.add(buffer, (err, result) => { // Upload buffer to IPFS
    //             if(err) {
    //               console.error(err)
    //               throw err;
    //             }
    //             let url = `https://ipfs.io/ipfs/${result[0].hash}`
    //             console.log(`Url --> ${url}`)
    //             return url;
    //         })
    //     })
    // }

    // static createArtwork(contract,coinbase, title, price, url, forSale) {
    //     console.log("@@@@@#####");
    //     console.log(contract);
    //     console.log(coinbase);
    //     contract.createArtwork(
    //         title, url, price, forSale,{gas:600000, from: "0xA1432ea596b9C7c283A9BC041C378eb93696C974"},
    //         function(err, result) {
    //         console.log("@#@#@VUYIHOJ");
    //         console.log(err, result);
    //     });
    // }

    static purchaseArtwork(contract, coinbase) {

    }
}
  

const abiArray = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "_interfaceID",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "cfoAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"name": "_preferredTransport",
				"type": "string"
			}
		],
		"name": "tokenMetadata",
		"outputs": [
			{
				"name": "infoUrl",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ceoAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "siringAuction",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newCEO",
				"type": "address"
			}
		],
		"name": "setCEO",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newCOO",
				"type": "address"
			}
		],
		"name": "setCOO",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "sireAllowedToAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "kittyIndexToApproved",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newCFO",
				"type": "address"
			}
		],
		"name": "setCFO",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "secs",
				"type": "uint256"
			}
		],
		"name": "setSecondsPerBlock",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"name": "owner",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "count",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "secondsPerBlock",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "tokensOfOwner",
		"outputs": [
			{
				"name": "ownerTokens",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "cooldowns",
		"outputs": [
			{
				"name": "",
				"type": "uint32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "kittyIndexToOwner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "cooAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "erc721Metadata",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_contractAddress",
				"type": "address"
			}
		],
		"name": "setMetadataAddress",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "saleAuction",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "kittyId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "matronId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "sireId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "genes",
				"type": "uint256"
			}
		],
		"name": "Birth",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "newContract",
				"type": "address"
			}
		],
		"name": "ContractUpgrade",
		"type": "event"
	}
];