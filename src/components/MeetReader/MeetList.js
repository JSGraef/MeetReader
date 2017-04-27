import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './MeetReader.css';

// Firebase 
import {config} from '../../config/constants';
import Rebase  from 're-base';
var base = Rebase.createClass(config, 'TeamCaptain');

class MeetList extends Component {

  constructor() {
    super();

    this.state = {meets: {}}
  }

  componentDidMount() {
    var path = 'MRVAC/meets/meetlist';

    base.fetch(path, {
        context : this,
        then(data) {
            this.setState({meets: data})
    }});
  }
  
  render() {
    const meetkeys = Object.keys(this.state.meets);
    return (
      <div>
        <h2>Meets:</h2>
        {meetkeys.map( key => {
          const meet = this.state.meets[key];
          if(meet === undefined) return '';
          return <Link key={key} to={`./meet/${key}`}><h4>{meet.meetStart} - {meet.meetName}</h4></Link>
        } )}
      </div>
    )
  }
}

export default MeetList;
