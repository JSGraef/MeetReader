import React from 'react';
import Swimmer from './Swimmer';

const Team = (props) => {
    const swimmerKeys = Object.keys(props.team.swimmers);
    return (            
    <div key={props.team.teamCode}>
        <h2><a name={props.team.teamCode}>{props.team.teamName}</a></h2>
        <h4>{props.team.teamCode}</h4>
        <div className="mdl-grid">
            {swimmerKeys.map(key => 
                { return (
                    <div className="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone mdl-cell--4-col-tablet" key={key}>
                        <Swimmer swimmer={props.team.swimmers[key]} />
                    </div>
                )}
            )}
        </div>
    </div>
    );
}

export default Team;