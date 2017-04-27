import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';

import MREvents from './MREvents';
import MREvent from './MREvent';
import MRTeam from './MRTeam';
import MRSwimmer from './MRSwimmer';

import './MeetReader.css';

import {Spin} from 'antd';

// Firebase 
import {config} from '../../config/constants';
import Rebase  from 're-base';
var base = Rebase.createClass(config, 'TeamCaptain');


class MeetReader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      meetid: props.match.params.meetid,
      teams: [],
      events: [],
      loading: true
    }
  }

  componentDidMount() {

    var path = `MRVAC/meets/${this.state.meetid}`;

    base.fetch(path, {
        context : this,
        then(data) {
            this.setState({
              teams: data.teams, 
              events: data.events,
              loading: false
            });
            this.props.onImportMeet(data.events, data.teams);
    }});
  }

  render() {  
    if(this.state.loading)
      return <h1>Loading...<Spin size="large" /></h1>

    return (
        <div>
            <Link to={`${this.props.match.url}/events`}>Events</Link>
            <Route exact path={`/meet/:meetid/events`} render={ (props) => <MREvents events={this.state.events} {...props}/> }/>
            <Route path={`/meet/:meetid/events/:eventid`} render={ (props) => <MREvent events={this.state.events} {...props}/> }/>
            <Route path={`/meet/:meetid/team/:teamid`} render={ (props) => <MRTeam teams={this.state.teams} {...props}/> }/>
            <Route path={`/meet/:meetid/swimmer/:swimmerid`} render={ (props) => <MRSwimmer teams={this.state.teams} {...props}/> }/>
        </div>
    );
  }
}

export default MeetReader;
