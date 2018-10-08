import React from 'react';

import Helmet from 'react-helmet';

class Planet extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Helmet>
                    <title>{this.props.planet.name}</title>
                </Helmet>
                <h2>{this.props.planet.name}</h2>
                <p>
                    {this.props.planet.description}
                </p>
            </div>
        );
    }
}

export default Planet;