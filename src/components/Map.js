import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import whiteCar64 from '../img/whiteCar.js'

class Map extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            iconSettings: {
                url: whiteCar64,
                scaledSize: (30, 30),
                anchor: { x: 15, y: 15 }
            }
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
                            onLoad={map => {
                                const iconSize = new window.google.maps.Size(30, 30);
                                this.setState({
                                    iconSettings: {
                                        ...this.state.iconSettings,
                                        scaledSize: iconSize
                                    }
                                })
                            }}
                        >
                            <Marker
                                icon={this.state.iconSettings}
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