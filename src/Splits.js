import React from 'react';
import U from './utils';

const Splits = (props) => {
    const allSplits = props.splits;

    let splits = [];
    //console.log(allSplits.length);
    if(allSplits.length === 1) {
        splits.push( allSplits[0].splitTime1 );
        splits.push( allSplits[0].splitTime2 );
        splits.push( allSplits[0].splitTime3 );
        splits.push( allSplits[0].splitTime4 );
        splits.push( allSplits[0].splitTime5 );
        splits.push( allSplits[0].splitTime6 );
        splits.push( allSplits[0].splitTime7 );
        splits.push( allSplits[0].splitTime8 );
        splits.push( allSplits[0].splitTime9 );
        splits.push( allSplits[0].splitTime10 );
    }
    else if(allSplits.length === 2) {
        splits.push( allSplits[1].splitTime1 );
        splits.push( allSplits[1].splitTime2 );
        splits.push( allSplits[1].splitTime3 );
        splits.push( allSplits[1].splitTime4 );
        splits.push( allSplits[1].splitTime5 );
        splits.push( allSplits[1].splitTime6 );
        splits.push( allSplits[1].splitTime7 );
        splits.push( allSplits[1].splitTime8 );
        splits.push( allSplits[1].splitTime9 );
        splits.push( allSplits[1].splitTime10 );
    }


    return (
        <td colSpan="4" className="swim-splitTd">
            { splits.map( split => {
                return <span key={U.guid()} className='swim-split'>{split}</span>
            })}
        </td>
            
    )}

export default Splits;