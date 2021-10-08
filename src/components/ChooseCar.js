import React from 'react';
import { BsPinMap, BsPinMapFill, BsFillClockFill } from "react-icons/bs";
import { GiPathDistance, GiSpeedometer, GiStopSign } from "react-icons/gi";

class ChooseCar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bruteCarData: this.props.bruteCarData,
            setMapData: this.props.setMapData
        };
    }

    generateMapData(courses, clickedCourse) {
        const selectedCourse = courses[clickedCourse];
        const { gps } = selectedCourse;

        const response = gps.map(
            coordinate => {
                const { speed, direction } = coordinate;

                return {
                    lng: Number(coordinate.longitude),
                    lat: Number(coordinate.latitude),
                    speed,
                    direction,
                }
            }
        );

        return response;
    }

    updateMapData({ courses }, clickedCourse) {

        const mapData = this.generateMapData(courses, clickedCourse);
        this.state.setMapData(mapData);
    }

    getFormatedDuration(durationInSeconds) {

        let responseHours = 0;

        while (durationInSeconds > 3600) {
            durationInSeconds -= 3600;
            responseHours++;
        }

        const durationInMinutes = durationInSeconds / 60;
        const roundedDurationInMinutes = Math.floor((durationInMinutes));
        const response = (responseHours ? (`${responseHours}h `) : '') + roundedDurationInMinutes;

        return response;
    }

    render() {

        const maxCourses = this.state.bruteCarData.num_courses || 1;
        const { courses } = this.state.bruteCarData || { courses: [] };
        const addressMaxSize = 70;

        return (
            <div id="ChooseCar" className={`grid lg:grid-cols-${maxCourses < 4 ? maxCourses : 4} md:grid-cols-2 sm:grid-cols-1 h-2/6 overflow-y-scroll bg-gray-700`}>
            
                {courses.map(
                    (course, courseIndex) => {

                        const courseLength = course.gps.length - 1;
                        const startPoint = `${(course.gps[0].address).substr(0, addressMaxSize)}...`;
                        const endPoint = `${(course.gps[courseLength].address).substr(0, addressMaxSize)}...`;

                        return(
                            <div
                                key={courseIndex}
                                className="bg-white p-4 m-6 box-content rounded-2xl cursor-pointer shadow-xl transition ease-out duration-500 transform hover:scale-105 motion-reduce:transform-none"
                                onClick={event => this.updateMapData(this.state.bruteCarData, courseIndex)}
                            >
                                <p className='m-1 text-base'><BsPinMap/> Origem: {startPoint}</p>
                                <p className='m-1 text-base'><BsPinMapFill/> Destino: {endPoint}</p>
                                <p className='m-1 text-base'><BsFillClockFill/> Duração: {this.getFormatedDuration(course.duration)}m</p>
                                <p className='m-1 text-base'><GiPathDistance/> Distância: {course.distance}m</p>
                                <p className='m-1 text-base'><GiSpeedometer/> Velocidade média: {course.speed_avg}km/h</p>
                                <p className='m-1 text-base'><GiStopSign/> Paradas: {course.stops}</p>
                            </div>
                        )
                    }
                )}
            
            </div>
        )
    }
}

export default ChooseCar;