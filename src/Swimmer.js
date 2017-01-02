import React from 'react';
import Swim from './Swim';

const Swimmer = (props) => {
    const swim = props.swimmer.swims[0];
    return (
        <div>
            <h5>{swim.swimmerName} - [{swim.swimmerAge}]</h5>

            {props.swimmer.swims.map( swim => {
                return <Swim key={`${swim.eventDist}${swim.strokeCode}${swim.ussNum}`} swim={swim} />  
            })}

        </div>
    );
}

export default Swimmer;