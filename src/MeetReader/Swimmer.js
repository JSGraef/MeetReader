import React from 'react';
import Swim from './Swim';
import U from './utils';

// Shows info about swimmer and all their swims
const Swimmer = (props) => {
    if(props.swimmer === undefined)
        return <h4>Couldn't find swimmer</h4>

    const swim = props.swimmer.swims[0];

    return (
        <div className="mdl-cell mdl-cell--12-col swimmer">
            <div className="swimmer-header">
                <h4>{swim.swimmerName}</h4>
            </div>
            
            <table className="" width="100%">
            <thead>
                <tr>
                    <th>Event</th>
                    <th>Seed Time</th>
                    <th>Prelim Time</th>
                    <th>Finals Time</th>
                    <th>Time Adjustment</th>
                    <th>Place</th>
                    <th>Points Scored</th>
                </tr>
            </thead>
            
                {props.swimmer.swims.map( swim => {
                    return <Swim key={U.guid()} swim={swim} />
                })}
            
            </table>
        </div>
    );
}

export default Swimmer;