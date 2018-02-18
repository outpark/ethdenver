import React from 'react';
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
        }else if(this.props.match.url === "/upload"){
            this.setState({activeItem:"upload"});
        }else if(this.props.match.url === "/collections"){
            this.setState({activeItem:"collections"});
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
        }else if(name === "collections"){
            this.props.history.replace("/collections")
        }

    }

    render() {
        const { activeItem } = this.state
        return(
            <div className="navbar-outer-container">
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
            </div>
        )
    }
    
}

export default Navbar;