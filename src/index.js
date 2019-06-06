import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class Planets extends React.Component{
    constructor(props){
        super(props);

        // React components have a predefined state object
        this.state = {

            // setting up a property to hold an array of planets
            planets: [],
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

    // method to retrieve a single planet
    getPlanet(idOfPlanet){
        axios.get(`http://ghosteacher.com/apis/planets.php?apikey=pineapple&p_id=${idOfPlanet}`)
        .then(
            response => this.setState({
                planet: response.data
            })
        );
    }

    // this is a predefined method that fires when the component loads on page
    componentDidMount(){
        // when the component loads, populate the planets array using the getPlanets method
        this.getPlanets();
    }

    render(){
        return(
            <ul>
                {
                    // use .map to iterate through an array
                    this.state.planets.map(
                        (planet) => <li 
                        key={planet.id} 
                        onClick={this.getPlanet(planet.id)}
                        >
                        {planet.name}
                        </li>)
                }
            </ul>
        );
    }
}

class Planet extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="planet">
                <h2>{this.props.planet.name}</h2>
            </div>
        );
    }
}

ReactDOM.render(<Planets />, document.querySelector('#root'));