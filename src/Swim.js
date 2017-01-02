import React from 'react';
import U from './utils';

const Swim = (props) => {
    const swim = props.swim;
    return <p>{`${swim.eventDist} ${U.getStrokeFromCode(swim.strokeCode)} - [${swim.prelimTime}]`}</p>
}

export default Swim;