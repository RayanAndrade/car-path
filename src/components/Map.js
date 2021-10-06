import React from 'react';

class Map extends React.Component{

    constructor(props){

        super(props);
        this.state = {
        }

    }

    render(){

        console.log('props', this.props.mapData);

        return (
            <div className="bg-gray-500 h-4/6">
                Map
            </div>
        )
    }
}

export default Map;