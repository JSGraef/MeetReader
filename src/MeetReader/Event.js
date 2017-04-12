import React from 'react';
import U from './utils';
import EventSwim from './EventSwim';
import EventSwimRelay from './EventSwimRelay';

const Event = (props) => {
    if(props.event === undefined)
        return <h4>Couldn't find event</h4>

    const event = props.event;

    // Order swimmers by place
    let swimmersInOrder = event.sort( (a,b) => {

        let diff = U.timeDiff(b.finalsTime, a.finalsTime);

        // TO COMPARE TIMES:
        // If a finals time exists, use that.
        // if one finals and one prelim, finals comes first.
        // if two prelim, compare prelims

        // Something's up with the times. One probably does not exist.
        if(diff === '') {

            // If DQ at all, send them to the end
            if(a.finalsTime.includes('DQ') || a.prelimTime.includes('DQ') )
                return 1;
            if(b.finalsTime.includes('DQ') || b.prelimTime.includes('DQ') )
                return -1;

            //  I consider a finals time of NS (no swim) to be on top of the prelims times (it should anyway)
            const hasFinalTimeB = a.finalsTime.includes('NS');
            const hasFinalTimeA = a.finalsTime.includes('NS');
            if(hasFinalTimeA && !hasFinalTimeB)
                return 1;
            if(hasFinalTimeB && !hasFinalTimeA)
                return -1;

            // Since we don't have finals times, must try to compare prelim times
            const prelimA = (a.finalsTime === '' || a.finalsTime === 'Y' || a.finalsTime.includes('NS'));
            const prelimB = (b.finalsTime === '' || b.finalsTime === 'Y' || b.finalsTime.includes('NS'));

            // If both are prelim times, compare them
            if(prelimA && prelimB) {
                
                diff = U.timeDiff(b.prelimTime, a.prelimTime);

                if(a.prelimTime === '' || a.prelimTime === 'Y' || a.prelimTime.includes('NS') ) 
                    diff = 1;
                if(b.prelimTime === '' || b.prelimTime === 'Y' || b.prelimTime.includes('NS'))
                    diff = -1;

                // One of the prelim times is messed up - no information. So 
                if(diff === '')
                    return 1;
            }
            else
                return prelimA ? 1 : -1;
        }
            
        return diff;
    });

    // If we have a relay (which follows a different format)
    if(swimmersInOrder[0].swimmers !== undefined) {
        return (
            <div className="mdl-cell mdl-cell--12-col swimmer">
                <div className="swimmer-header">
                    <h4>{U.parseEventTitle(event[0])}</h4>
                </div>
                
                <table className="" width="100%">
                <thead>
                    <tr>
                        <th>Place</th>
                        <th>Name</th>
                        <th>Seed Time</th>
                        <th>Prelim Time</th>
                        <th>Finals Time</th>
                        <th>Time Adjustment</th>
                        <th>Points Scored</th>
                    </tr>
                </thead>

                {swimmersInOrder.map( relay => {
                    return <EventSwimRelay key={U.guid()} relay={relay} />
                })}
                
                </table>
            </div>
        );
    }

    return (
        <div className="mdl-cell mdl-cell--12-col swimmer">
            <div className="swimmer-header">
                <h4>{U.parseEventTitle(event[0])}</h4>
            </div>
            
            <table className="eventTable" width="100%">
            <thead>
                <tr>
                    <th>Place</th>
                    <th>Name</th>
                    <th>Team</th>
                    <th>Seed Time</th>
                    <th>Prelim Time</th>
                    <th>Finals Time</th>
                    <th>Time Adjustment</th>
                    <th>Points Scored</th>
                </tr>
            </thead>
            
                {swimmersInOrder.map( swimmer => {
                    let team='';

                    if(props.teams !== undefined){
                        const swimmerid = swimmer.ussNum;

                        for(let t of props.teams) {
                            if( swimmerid in t.swimmers) {
                                team = t.teamCode;
                                break;    
                            }
                        }
                    }

                    return <EventSwim key={U.guid()} swimmer={swimmer} team={team}/>
                })}
            
            </table>
        </div>
    );
}

export default Event;