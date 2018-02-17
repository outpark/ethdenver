import React from 'react';
// import ImageUploader from 'react-images-upload';
import Dropzone from 'react-dropzone'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { Input, Button, Label, Form, TextArea  } from 'semantic-ui-react';
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
            titleErr:false,
            priceErr:false
         };
        this.onDrop = this.onDrop.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

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
            console.log(Connector.getContract(this.props.web3, 0x345ca3e014aaf5dca488057592ee47305d9b3e10));
        }
    }

    handleTitleChange(e) {
        
        this.setState({ title: e.target.value });
        if(this.state.title.length <= 2){
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