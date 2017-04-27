import React, { Component } from 'react';
import Team from './Team';

// Shows <Team> of URL Team ID
class MRTeam extends Component {

    render() {
        const teams = this.props.teams;
        if(teams === undefined)
            return <h4>Couldn't find that team</h4>

        let team = {};

        for(let t of teams) {
            if(t.teamCode === this.props.match.params.teamid) {
                team = t;
                break;
            }
        }
        if(teams.length === 0 || Object.keys(team).length === 0 || team === undefined)
            return <h4>Couldn't find that team</h4>

        return <Team key={team.teamCode} meetid={this.props.match.params.meetid} team={team} />
    }
}

export default MRTeam;