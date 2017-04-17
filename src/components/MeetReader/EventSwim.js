import React from 'react';
import U from './utils';
import Splits from './Splits';
import {Link} from 'react-router-dom';

const EventSwim = (props) => {
    if(props.swimmer === undefined)
        return <h4>Couldn't find swimmer</h4>

    const swim = props.swimmer;

    // WARNING: This code is duplicated in Swim.js
    const finalsTime = swim.finalsTime.substring(0,swim.finalsTime.length-1);
    let time = (finalsTime === '') ? swim.prelimTime : finalsTime ;

    let timeDiff = U.timeDiff(swim.seedTime, time);
    let timeDiffClass = 'swim-diffNeg';
    if(timeDiff > 0) {
        timeDiff = '+'+timeDiff;
        timeDiffClass = 'swim-diffPos';
    }

    return (
        <tbody>
        <tr className="swim-event-tr">
            <td>{swim.finalsPlace === '0' ? '-' : swim.finalsPlace}</td>
            <td className="swim-eventTitle mdl-data-table__cell--non-numeric"><Link to={`/meet/swimmer/${swim.ussNum}`}>{swim.swimmerName}</Link></td>
            <td><Link to={`/meet/team/${props.team}`}>{props.team}</Link></td>
            <td>{swim.seedTime}</td>
            <td>{swim.prelimTime}</td>
            <td className="swim-finalTime">{finalsTime}</td>
            <td className={timeDiffClass}>{timeDiff}</td>
            <td>{swim.pointsScored}</td>
        </tr>
       { swim.splits.map( s => {
                return (
                    <tr key={U.guid()}>
                        <td colSpan='2' className="swim-splitTitle">SPLITS:</td>
                        <Splits splits={s} />
                    </tr>
            )})}
        </tbody>
    )}

export default EventSwim;