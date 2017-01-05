import React from 'react';

const TeamList = (props) => {
    //const swimmerKeys = Object.keys(props.team.swimmers);
    return (            
    <div key={props.team.teamCode}>
        <a href={`#${props.team.teamCode}`}>{props.team.teamCode}</a>
    </div>
    );
}

export default TeamList;