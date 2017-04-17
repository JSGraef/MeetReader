import React from 'react';
import U from './utils';
import EventList from './EventList';

// First thing user sees when they upload a meet
const MRDashboard = (props) => {
    if(props.events === undefined || props.events[0] === undefined)
        return <span></span>

    return (            
        <div>
            <h4>Event List</h4>
            <EventList key={U.guid()} {...props} />
        </div>
    );
}

export default MRDashboard;