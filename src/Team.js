import React from 'react';
import Swimmer from './Swimmer';

const Team = (props) => {
    const swimmerKeys = Object.keys(props.team.swimmers);
    return (            
    <div key={props.team.teamCode}>
        <h3>{`[${props.team.teamCode}] ${props.team.teamName}`}</h3>
        {swimmerKeys.map(key => 
            { return <Swimmer key={key} swimmer={props.team.swimmers[key]} /> }
        )}
    </div>
    );
}

export default Team;