import React, { Component } from 'react';

import './MeetReader.css';
import TeamList from './TeamList';
import MRDashboard from './MRDashboard';
import U from './utils';
import {Link, Route} from 'react-router-dom';

import MREvents from './MREvents';
import MREvent from './MREvent';
import MRTeam from './MRTeam';
import MRSwimmer from './MRSwimmer';

import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;

import DropzoneComponent from 'react-dropzone-component';
import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';

class MeetReader extends Component {

  render() {    
    return (
        <Layout style={{ padding: '0 24px 24px', height: '100%' }}>
          
            <Breadcrumb style={{ margin: '12px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Import</Breadcrumb.Item>
            </Breadcrumb>

            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280, height: '100%' }}>
                  
                <Route exact path={`${this.props.match.url}/events`} render={ (props) => <MREvents events={this.props.events} {...props}/> }/>
                <Route path={`${this.props.match.url}/events/:eventid`} render={ (props) => <MREvent events={this.props.events} {...props}/> }/>
                <Route path={`${this.props.match.url}/team/:teamid`} render={ (props) => <MRTeam teams={this.props.teams} {...props}/> }/>
                <Route path={`${this.props.match.url}/swimmer/:swimmerid`} render={ (props) => <MRSwimmer teams={this.props.teams} {...props}/> }/>
    
            </Content>
        </Layout>
    );
  }
}

export default MeetReader;
