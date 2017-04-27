import React, { Component } from 'react';
import Swimmer from './Swimmer';

// Shows swimmer info based on URL input of swimmer's USSNum
class MRSwimmer extends Component {

    render() {
        const teams = this.props.teams;

        if(teams === undefined)
            return <h4>Couldn't find that swimmer</h4>

        let swimmer = {};
        const swimmeridMod = this.props.match.params.swimmerid.slice(0,-2);
        const swimmerid = this.props.match.params.swimmerid;

        // Sometimes we come in with a full USSNum, othertimes the last two digits are cut off
        // For now, just look for both
        for(let t of teams) {
            if( swimmerid in t.swimmers) {
                swimmer = t.swimmers[swimmerid];
                break;
            } else if( swimmeridMod in t.swimmers) {
                swimmer = t.swimmers[swimmeridMod];
                break;
            }
        }

        if(teams.length === 0 || Object.keys(swimmer).length === 0 || swimmer === undefined)
            return <h4>Couldn't find that swimmer</h4>

        return <Swimmer key={swimmer.ussNum} meetid={this.props.match.params.meetid} swimmer={swimmer} />
    }
}

export default MRSwimmer;