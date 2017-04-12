import React, { Component } from 'react';
import Event from './Event';

// Shows event based on URL event ID
class MREvent extends Component {

    render() {
        const {events, teams} = this.props;
        if(events === undefined)
            return <h4>Couldn't find event</h4>
        
        const eventid = this.props.match.params.eventid;

        if(events.length === 1)
            return <h4>Still loading events...</h4>

        let event = {};        

        // e is the array list of swimmers in the event
        for(let e of events) {
            if(e === undefined || e.length === 0)
                continue;

            if( e[0].eventNum === eventid) {
                event = e;
                break;
            } 
        }

        if(events.length === 0 || Object.keys(event).length === 0 || event === undefined)
            return <h4>Couldn't find that event</h4>

        return <Event event={event} teams={teams} />
    }
}

export default MREvent;