import React from "react";
import "../styles/index.css"
import ChooseCar from "./ChooseCar";
import Map from "./Map";
import carData from "../data/getCarData"

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            bruteCarData: carData,
            mapData: [{
                lat: -19.944824,
                lng: -43.941165
            }]
        };

    };

    setMapData = (mapData) => { this.setState( {mapData} ) };
    
    render(){
        return(
            <div className="App h-screen">
                <Map
                    mapData={this.state.mapData}
                />
                <ChooseCar 
                    bruteCarData={this.state.bruteCarData}
                    setMapData={this.setMapData}
                />
            </div>
        )
    };
}

export default App;
