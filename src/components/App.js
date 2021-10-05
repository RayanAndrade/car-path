import React from "react";
import "../styles/index.css"
import ChooseCar from "./ChooseCar";
import LoadedMap from "./Map";
import carData from "../data/getCarData"

class App extends React.Component {

    state = {
        bruteCarData: carData
    };

    render(){

        return(
            <div className="App h-screen">
                <LoadedMap/>
                <ChooseCar 
                    bruteCarData={this.state.bruteCarData}
                />
            </div>
        )
    };
}

export default App;
