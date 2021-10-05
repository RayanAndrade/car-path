import React from 'react';

class ChooseCar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            bruteCarData: this.props.bruteCarData
        };
    }

    getFormatedDuration(durationInSeconds){

        let responseHours = 0;

        while(durationInSeconds > 3600){
            durationInSeconds -= 3600;
            responseHours++;
        }

        const durationInMinutes = durationInSeconds / 60;
        const roundedDurationInMinutes = Math.floor( ( durationInMinutes) );
        const response = (responseHours ? (`${responseHours}h `) : '') + roundedDurationInMinutes;
        
        return response;
    }
    
    render() {
        
        const {courses} = this.state.bruteCarData || {courses: []};

        return (
            <div id="ChooseCar" className="overflow-x-auto overflow-y-hidden h-2/6">
                <div className={`grid grid-cols-${courses.length} h-full gap-2 p-4`}>
                    {courses.map(
                        (course, courseIndex) => (
                            <div 
                                key={courseIndex}
                                className="h-5/6 bg-gray-100 p-2 m-4 border-4 box-content cursor-pointer"
                            >
                                <h3>Duração: { this.getFormatedDuration(course.duration) }m</h3>
                                <h3>Distância: {course.distance}m</h3>
                                <h3>Velocidade média: {course.speed_avg}km/h</h3>
                                <h3>Paradas: {course.stops}</h3>
                            </div>
                        )    
                    )}
                </div>
            </div>
        )
    }
}

export default ChooseCar;