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

        const eventKeys = Object.keys(events);    

        // e is the array list of swimmers in the event
        for(let e of eventKeys) {
            const ev = events[e];
            if(ev === undefined || ev.length === 0)
                continue;

            if( ev[0].eventNum === eventid) {
                event = ev;
                break;
            } 
        }

        if(events.length === 0 || Object.keys(event).length === 0 || event === undefined)
            return <h4>Couldn't find that event</h4>

        return <Event event={event} teams={teams} meetid={this.props.match.params.meetid} eventid={eventid} />
    }
}

export default MREvent;