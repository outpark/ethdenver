import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Menu } from 'semantic-ui-react';

import '../css/navbar.css'

class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeItem:'AppName'
        }
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    componentDidMount() {
        if(this.props.match.url === "/market"){
            this.setState({activeItem:"market"});
        }else if(this.props.match.url === "/artists"){
            this.setState({activeItem:"artists"});
        }
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
        if(name === "market"){
            this.props.history.replace("/market");
        }else if(name === "AppName"){
            this.props.history.replace("/");
        }else if(name === "upload"){
            this.props.history.replace("/upload")
        }

    }

    render() {
        const { activeItem } = this.state
        return(
            <Menu secondary className="navbar-container">
                <Menu.Item name='AppName' active={this.state.activeItem === 'AppName'} onClick={this.handleItemClick} />
                <Menu.Menu position='right'>
                    <Menu.Item name='market' active={this.state.activeItem === 'market'} onClick={this.handleItemClick} />
                    <Menu.Item name='artists' active={this.state.activeItem === 'artists'} onClick={this.handleItemClick} />
                    <Menu.Item name='upload' active={this.state.activeItem === 'upload'} onClick={this.handleItemClick} />
                </Menu.Menu>
                <Menu.Menu position='right'>
                    <Menu.Item name='collections' active={this.state.activeItem === 'collections'} onClick={this.handleItemClick} />
                </Menu.Menu>
            </Menu>
        )
    }
    
}

export default Navbar;