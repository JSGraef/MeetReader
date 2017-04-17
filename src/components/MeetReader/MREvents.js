import React from 'react';
import Event from './Event';

// Shows all event cards
const MREvents = (props) => {
    if(props.events === undefined)
        return <h4>Couldn't find event</h4>

    return (
        <div>
            { props.events.map( e => {
                if(e[0] === undefined || e === [])
                    return null;
                
                return <Event key={e[0].eventNum} event={e} {...props} />
            }) }
        </div>
    );
}

export default MREvents;