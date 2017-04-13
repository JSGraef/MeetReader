import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import MREvents from './MREvents';
import MREvent from './MREvent';
import MRTeam from './MRTeam';
import MRSwimmer from './MRSwimmer';

import './MeetReader.css';

const MeetHome = () => (
  <div>
    <h2>No meets yet!</h2>
  </div>
)

class MeetReader extends Component {

  render() {    
    return (
        <div>
            <Route exact path={`${this.props.match.url}/`} component={MeetHome} />
            <Route exact path={`${this.props.match.url}/events`} render={ (props) => <MREvents events={this.props.events} {...props}/> }/>
            <Route path={`${this.props.match.url}/events/:eventid`} render={ (props) => <MREvent events={this.props.events} {...props}/> }/>
            <Route path={`${this.props.match.url}/team/:teamid`} render={ (props) => <MRTeam teams={this.props.teams} {...props}/> }/>
            <Route path={`${this.props.match.url}/swimmer/:swimmerid`} render={ (props) => <MRSwimmer teams={this.props.teams} {...props}/> }/>
        </div>
    );
  }
}

export default MeetReader;
