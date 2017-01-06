import React from 'react';
import Swim from './Swim';

const Swimmer = (props) => {
    const swim = props.swimmer.swims[0];
    return (
        <div className="mdl-cell mdl-cell--12-col swimmer">
            <div className="swimmer-header">
                <h4>{swim.swimmerName}</h4>
                <h6>{`Age ${swim.swimmerAge}`}</h6>
            </div>
            
            <table className="mdl-data-table" width="100%">
            <thead>
                <tr>
                    <th>Event</th>
                    <th>Seed Time</th>
                    <th>Prelim Time</th>
                    <th>Finals Time</th>
                    <th>Time Adjustment</th>
                    <th>Points Scored</th>
                </tr>
            </thead>
            
                {props.swimmer.swims.map( swim => {
                    return <Swim key={`${swim.eventDist}${swim.strokeCode}${swim.ussNum}`} swim={swim} />
                })}
            
            </table>
        </div>
    );
}

export default Swimmer;