import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react'
import '../css/artCard.css'

class ArtCard extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const extra = (
            <a>
              <Icon name='user' />
              16 ETH
            </a>
          )
        return(
            <Card
                image={this.props.art.imgUrl}
                header='Elliot Baker'
                meta='Friend'
                description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                extra={extra}
                className="card-container"
            />
        )
    }
    
}

export default ArtCard;