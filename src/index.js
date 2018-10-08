import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Helmet from 'react-helmet';

import Planet from './Planet';

class Planets extends React.Component{
    constructor(props){
        super(props);

        // React components have a predefined state object
        this.state = {

            // setting up a property to hold an array of planets
            planets: [],

            // property to hold a single planet
            planet: null
        }

        // because of odd nature of javascript, you need to bind methods to the component if you want the method to be invoked on events 
        this.getPlanets = this.getPlanets.bind(this);
        this.getPlanet = this.getPlanet.bind(this);
    }

    // method to retrieve list of planets
    getPlanets(){
        // using axios to make a GET request to an API endpoint
        axios.get('http://ghosteacher.com/apis/planets.php?apikey=pineapple')
        .then(
                response => this.setState({
                    planets: response.data
                })
            );
    }

    getPlanet(planetId){
        axios.get('http://ghosteacher.com/apis/planets.php?apikey=pineapple&p_id=' + planetId).then(
            response => this.setState({
                planet: response.data
            })
        );
    }

    clearPlanet(){
        this.setState({
            planet: null
        });
    }

    // this is a predefined method that fires when the component loads on page
    componentDidMount(){
        // when the component loads, populate the planets array using the getPlanets method
        this.getPlanets();
    }

    render(){
        return(
            <div id="planetInfo">
                <Helmet>
                    <title>Planets</title>
                </Helmet>
                <ul>
                    {
                        // use .map to iterate through an array
                        // (e) => so it doesn't loop or call right away
                        this.state.planets.map((planet) => <li key={planet.id} onClick={(e) => this.getPlanet(planet.id)}>{planet.name}</li>)
                    }
                </ul>
                <button onClick={(e) => this.clearPlanet()}>Clear planet</button>
                {this.state.planet &&
                    <Planet planet={this.state.planet} />
                }
            </div>
        );
    }
}

ReactDOM.render(<Planets />, document.querySelector('#root'));