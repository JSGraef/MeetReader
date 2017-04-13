import React from 'react';
import U from './utils';
import Splits from './Splits';
import {Link} from 'react-router-dom';

// Shows a particular swim from a list of swims
const Swim = (props) => {
    const {swim} = props;

    if(swim === undefined)
        return <h4>Couldn't find swim</h4>

    // WARNING: This code is duplicated in EventSwim
    let finalsTime = swim.finalsTime.substring(0,swim.finalsTime.length-1);
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
                <td className="swim-eventTitle">
                    <Link to={`/meet/events/${swim.eventNum}`}>{`${swim.eventDist} ${U.getStrokeFromCode(swim.strokeCode)}`}</Link>
                </td>
                <td>{swim.seedTime}</td>
                <td>{swim.prelimTime}</td>
                <td className="swim-finalTime">{finalsTime}</td>
                <td className={timeDiffClass}>{timeDiff}</td>
                <td>{swim.finalsPlace}</td>
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

export default Swim;