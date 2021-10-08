import React from 'react';
import { GoogleMap, Marker, useJsApiLoader, Polyline } from '@react-google-maps/api';
import { SphericalUtil as spherical } from 'node-geometry-library';
import whiteCar64 from '../img/whiteCar.js'

class Map extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            progress: [this.props.mapData[0]],
            iconSettings: {
                url: whiteCar64,
                anchor: { x: 15, y: 15 },
                scaledSize: new window.google.maps.Size(30, 30)
            },
        }

    }

    path = [];
    velocity = 100;
    initialDate = new Date();

    getDistance = () => {
        const differentInTime = (new Date() - this.initialDate) / 1000; // pass to seconds
        return differentInTime * this.velocity;
    };

    componentDidMount = () => {
        this.interval = window.setInterval(this.moveCar, 100);
    };

    componentWillUnmount = () => {
        this.path = [];
        window.clearInterval(this.interval);
    };

    componentWillUpdate = (nextProps) => {
        this.path = nextProps.mapData.map((coordinates, i, localPath) => {

            if (i === 0) {
                return { ...coordinates, distance: 0 };
            }

            // in meters
            const distance = spherical.computeDistanceBetween(
                coordinates,
                localPath[0]
            );
            return { ...coordinates, distance };
        });
        this.initialDate = nextProps.initialDate;

        if (this.path.length === this.state.progress.length) {
            return;
        }
    };

    moveCar = () => {
        const distance = this.getDistance();

        if (!distance) {
            return;
        }

        let progress = this.path.filter(
            coordinates => coordinates.distance < distance
        );

        const nextLine = this.path.find(
            coordinates => coordinates.distance > distance
        );

        //END
        if (!nextLine) {
            this.setState({ progress });
            return;
        }

        const lastLine = progress[progress.length - 1];

        const lastLineLatLng = {
            lat: lastLine.lat,
            lng: lastLine.lng
        };

        const nextLineLatLng = {
            lat: nextLine.lat,
            lng: nextLine.lng
        };

        // distance of this line
        const totalDistance = nextLine.distance - lastLine.distance;
        const percentage = (distance - lastLine.distance) / totalDistance;

        const position = spherical.interpolate(
            lastLineLatLng,
            nextLineLatLng,
            percentage
        );

        progress = progress.concat(position);

        this.setState({ progress });
    };

    render() {

        return (
            <div className="bg-gray-500 h-4/6">
                {
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        center={this.state.progress[this.state.progress.length - 1]}
                        zoom={15}
                    >
                        {(<>
                            <Polyline
                                path={this.state.progress}
                                options={{ strokeColor: "#FF0000" }}
                            />
                            <Marker
                                title="carro"
                                icon={this.state.iconSettings}
                                position={this.state.progress[this.state.progress.length - 1]}
                            />
                        </>)}
                    </GoogleMap>
                }
            </div>
        )
    }
}

function WrappedMap(props) {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY
    });

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
    }

    return isLoaded ? <Map {...props} /> : <></>

}

export default WrappedMap;