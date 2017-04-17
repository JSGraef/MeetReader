import React from 'react';
import {Link} from 'react-router-dom';
import U from './utils';

// Lists the individual event
const EventList = (props) => {
    if(props.events === undefined)
        return <h4>Couldn't find event list</h4>

    return ( 
         <ul>
            { props.events.map(event => 
                {
                    if(event.length === 0)
                        return null;

                    return (
                        <li key={event[0].eventNum}>
                            <Link to={`/meet/events/${event[0].eventNum}`}>{U.parseEventTitle(event[0])}</Link>
                        </li>
                    )
                })}           
        </ul>
    );
}

export default EventList;