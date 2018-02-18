import React from 'react';
import { Card, Icon } from 'semantic-ui-react'
import '../css/artCard.css'

class ArtCard extends React.Component {
    render() {
        let extra = {};
        this.props.art.forSale ? extra = (
            <a>
              <Icon name='at' />
              {this.props.art.price} ETH
            </a>
        ) : extra = (
            <a>
              <Icon name='tags' />
              Not For Sale
            </a>
        );
        return(
            <Card
                image={this.props.art.imgUrl}
                header={this.props.art.title}
                meta={this.props.art.creator}
                extra={extra}
                className="card-container"
            />
        )
    }
    
}

export default ArtCard;