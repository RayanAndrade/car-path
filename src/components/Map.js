import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

class Map extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
        }

    }

    render() {

        console.log(this.props.mapData)

        return (
            <div className="bg-gray-500 h-4/6">
                {
                    <LoadScript
                        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
                    >
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            center={this.props.mapData[0]}
                            zoom={15}
                        >
                            <Marker
                                position={this.props.mapData[0]}
                            />
                        </GoogleMap>
                    </LoadScript>
                }
            </div>
        )
    }
}

export default Map;