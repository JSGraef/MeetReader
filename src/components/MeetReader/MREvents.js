import React from 'react';
import Event from './Event';

// Shows all event cards
const MREvents = (props) => {
    if(props.events === undefined)
        return <h4>Couldn't find event</h4>

    const eventKeys = Object.keys(props.events);
    return (
        
        <div>
            { eventKeys.map( e => {
                if(props.events[e] === undefined || props.events[e] === [])
                    return null;
                
                return <Event key={e} event={props.events[e]} {...props} />
            }) }
        </div>
    );
}

export default MREvents;