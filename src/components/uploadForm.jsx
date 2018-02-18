import React from 'react';
// import ImageUploader from 'react-images-upload';
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify';
import { Input, Button, Label, Form, TextArea, Radio  } from 'semantic-ui-react';
import Connector from '../utils/connector';
import '../css/uploadForm.css';

class UploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            title:"",
            price:0,
            description:"",
            pictures: [],
            forSale:false,
            titleErr:false,
            priceErr:false
         };
        this.onDrop = this.onDrop.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleToggleChange = this.handleToggleChange.bind(this);

    }

    canBeSubmitted() {
        const { title, price, description, pictures } = this.state;
        return (
            title.length > 1 &&
            !isNaN(price) &&
            pictures.length > 0
        )
    }
    handleRef = (c) => {
        this.inputRef = c
      }
    
    focus = () => {
        this.inputRef.focus()
    }
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    componentDidMount() {
        // console.log(this.props.web3);
        // setTimeout(function() {
        //     console.log(Connector.getContract(this.props.web3, 0x75c35c980c0d37ef46df04d31a140b65503c0eed));
        // }, 15000)

    }

    handleSubmit(e) {
        if (!this.canBeSubmitted()) {
            e.preventDefault();
            alert("Can't submit");
            return;
        }else{
            console.log("ABOUT TO SUBMIT")
            console.log(this.state.pictures);
            (async () => {
                try {
                    console.log(this.props.web3.eth.coinbase);
                    let art = {
                        title:this.state.title,
                        price:this.state.price,
                        forSale: this.state.forSale
                    }
                    let contract = await Connector.getContract(this.props.web3, "0xaa95173df80abf6ff745d449b187c0374639151d");
                    let result = await Connector.uploadAndCreateArt(this.state.pictures[0], contract, this.props.web3.eth.coinbase, art);
                    // let result = await Connector.createArtwork(contract, this.props.web3.eth.coinbase, this.state.title, this.state.price, "https://ipfs.io/ipfs/QmR9DAU4qoreNJnazK1Dhy1inU8pzdaif9NUVdke191jGW", this.state.forSale);
                    console.log(result);
                    toast(`You have uploaded your artwork!`, {type:"success"})
                }catch(err){
                    toast(err, {type:"error"})
                    console.log(err);
                }
            })()
            
        }
    }

    handleTitleChange(e) {
        
        this.setState({ title: e.target.value });
        if(this.state.title.length <= 1){
            this.setState({
                titleErr:true
            });
        }else{
            this.setState({
                titleErr:false
            });
        }
    }
    handlePriceChange(e) {
        if(isNaN(parseInt(e.target.value))){
            this.setState({priceErr:true});
        }else{
            this.setState({priceErr:false});
        }
        this.setState({ price: parseInt(e.target.value) });
    }
    handleDescriptionChange(e) {
        this.setState({ description: e.target.value });
    }

    handleToggleChange() {
        this.setState({
            forSale:!this.state.forSale
        });
    }

    render() {
        return (
            <div className="uploadForm-container">
                <div className="uploadForm-row">
                    <Button content='title' onClick={this.focus} className="uploadForm-btn" />
                    <Input fluid ref={this.handleRef} error={this.state.titleErr} placeholder='title...' className="uploadForm-input" onChange={this.handleTitleChange}/>
                </div>
                <div className="uploadForm-row">
                    <Button content='price' onClick={this.focus} className="uploadForm-btn" />
                    <Input labelPosition='right' error={this.state.priceErr} fluid ref={this.handleRef} type='text' placeholder='1.5' className="uploadForm-input-label">
                        <input onChange={this.handlePriceChange}/>
                        <Label>ETH</Label>
                    </Input>
                </div>
                <Form className="uploadForm-row">
                    <Button content='description' onClick={this.focus} className="uploadForm-btn" />
                    <TextArea autoHeight ref={this.handleRef} onChange={this.handleDescriptionChange} placeholder='Tell us more about your artwork!' rows={4} className="uploadForm-textbox" />
                </Form>
                <div className="uploadForm-row">
                    <Button content='upload' onClick={this.focus} className="uploadForm-btn" />
                    <div className="uploadForm-dropzone">
                        <Dropzone onDrop={this.onDrop.bind(this)}>
                            <p>Try dropping some pictures here, or click to select pictures to upload.</p>
                        </Dropzone>
                        <aside>
                        <h2>Dropped pictures</h2>
                        <ul>
                            {
                            this.state.pictures.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                            }
                        </ul>
                        </aside>
                    </div>
                </div>
                <div className="uploadForm-row">
                    <Button content='for sale' onClick={this.focus} className="uploadForm-btn" />
                    <Radio toggle onClick={this.handleToggleChange}/>
                </div>
                <div className="uploadForm-row-btn">
                    <Button primary className="uploadForm-upload-btn" onClick={this.handleSubmit}>Upload to Market</Button>
                </div>
            </div>
        );
    }
}

UploadForm.propTypes = {
    onSubmit: PropTypes.func,
}

export default UploadForm