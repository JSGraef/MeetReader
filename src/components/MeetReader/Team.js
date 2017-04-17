import React from 'react';
import Swimmer from './Swimmer';

// Shows all swimmers and their swims for a provided team
const Team = (props) => {
    if(props.team === undefined)
        return <h4>Couldn't find team</h4>

    const swimmerKeys = Object.keys(props.team.swimmers);
    return (            
    <div key={props.team.teamCode}>
        <h2><a id={props.team.teamCode}>{props.team.teamName}</a></h2>
       
            {swimmerKeys.map(key =>
                { return <Swimmer key={key} swimmer={props.team.swimmers[key]} /> }
            )}
        
    </div>
    );
}

export default Team;