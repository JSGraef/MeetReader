import React from 'react';
import U from './utils';

const Swim = (props) => {
    const swim = props.swim;

    const finalsTime = swim.finalsTime.substring(0,swim.finalsTime.length-1);

    return (
        <tr>
            <td className="mdl-data-table__cell--non-numeric">{`${swim.eventDist} ${U.getStrokeFromCode(swim.strokeCode)}`}</td>
            <td>{swim.seedTime}</td>
            <td>{swim.prelimTime}</td>
            <td>{finalsTime}</td>
            <td>{U.timeDiff(swim.seedTime, swim.finalsTime)}</td>
            <td>{swim.pointsScored}</td>
        </tr>
    )}

export default Swim;