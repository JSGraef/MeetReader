import React from 'react';
import U from './utils';

// Gets the splits of a swim.
// TODO this is very basic and there's a lot of work to be done here
const SplitsRelay = (props) => {
    const swimmers = props.swimmers;
    
    let splits = [];
    for(let swimmer of swimmers) {
        if(swimmer.split[0] !== undefined)
            splits.push(swimmer.split[0].splitTime1);
    }

    const swim = swimmers[0];
    if(swim === undefined)
        return <td colSpan="4" className="swim-splitTd"><span key={U.guid()} className='swim-split'>No splits found</span></td>;
 
    const prelimOrFinal = (swim.split[0].prelimFinalCode === "F") ? 'FINALS' : 'PRELIMS';

    let splitIdx=0;
    return (
        <td colSpan="6" className="swim-splitTd">
            <span className='swim-split'>{prelimOrFinal}</span>
            { splits.map( split => {
                
                let splitTime = (splitIdx === 0) ? split : U.timeDiff(splits[splitIdx-1], split);
                if(splitTime !== '')
                    splitTime = `(${splitTime})`;
                
                if(split === '')
                    return <span key={U.guid()}></span>;

                splitIdx++                
                return <span key={U.guid()} className='swim-split'>{swimmers[splitIdx-1].swimmerName} {splitTime}</span>
            })}
        </td>
            
    )}

export default SplitsRelay;