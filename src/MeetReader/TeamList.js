import React from 'react';
import {Link} from 'react-router-dom';

// Shows a list of all teams in the meet file by their team codes
const TeamList = (props) => {
    if(props.teams === undefined)
        return <h4>Couldn't find team</h4>
    return (            
        <ul>
            { props.teams.map(team => {
                return (
                    <li key={team.teamCode}>
                        <Link to={`/meet/team/${team.teamCode}`}>{team.teamCode}</Link>
                    </li>
                )
            })}
        </ul>
    );
}

export default TeamList;