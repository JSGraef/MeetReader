import React from 'react';
import Swim from './Swim';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

const Swimmer = (props) => {
    const swim = props.swimmer.swims[0];
    return (
      
        <div>
            <CardTitle title={swim.swimmerName} subtitle={`Age ${swim.swimmerAge}`} />
            
                <table className="mdl-data-table">
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
                <tbody>
                    {props.swimmer.swims.map( swim => {
                        return <Swim key={`${swim.eventDist}${swim.strokeCode}${swim.ussNum}`} swim={swim} />
                    })}
                </tbody>
                </table>
        </div>
    );
}

export default Swimmer;