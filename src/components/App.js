import React from "react";
import "../styles/index.css"
import ChooseCar from "./ChooseCar";
import LoadedMap from "./Map";
import carData from "../data/getCarData"

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            bruteCarData: carData,
            mapData: [{}]
        };

    };

    setMapData = (mapData) => { this.setState( {mapData} ) };
    
    render(){
        return(
            <div className="App h-screen">
                <LoadedMap
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
