import React, { Component } from 'react';
import { Layout, Menu, Icon, BackTop } from 'antd';
const { SubMenu } = Menu;
const { Header, Sider } = Layout;

import { Route, Link } from 'react-router-dom';
import Home from './Home';

import MeetReader from './MeetReader/MeetReader';
import ImportMeet from './MeetReader/ImportMeet';

import './App.css';
import U from './MeetReader/utils';

class App extends Component {

  constructor() {
        super();

        this.state = {
            teams: [],
            events: []
        }

        this.onImportMeet = this.onImportMeet.bind(this);
    }

  onImportMeet(events, teams) {
    if(events === undefined || teams === undefined)
      return;

    this.setState({events, teams});
  }

  render() {
    return (
      <div>
        <Layout style={{ height: '100%' }}>
          <BackTop />

          <Header >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px'}}
            >
              <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
              <Menu.Item key="meet"><Link to="/meet">Meet</Link></Menu.Item>
              <Menu.Item key="import"><Link to="/import">Import</Link></Menu.Item>
            </Menu>
          </Header>


          <Layout>
            <Sider width={200} style={{ background: '#fff' }}>

              <Menu mode="inline" defaultOpenKeys={['teams']} style={{ height: '100%' }} >

                <SubMenu key="teams" title={<span><Icon type="user" />Teams</span>}>
                  { this.state.teams.map( team => { return <Menu.Item key={team.teamCode}><Link to={`/meet/team/${team.teamCode}`}>{team.teamCode}</Link></Menu.Item> } ) }
                </SubMenu>

                <SubMenu key="events" title={<span><Icon type="laptop" />Events</span>}>
                  <Menu.Item key="showall"><Link to={`/meet/events`}>Show All</Link></Menu.Item>
                  { this.state.events.map( event => { 
                    if(event.length === 0)
                      return '';
                    return <Menu.Item key={event[0].eventNum}><Link to={`/meet/events/${event[0].eventNum}`}>{U.parseEventTitle(event[0])}</Link></Menu.Item> 
                    })}
                </SubMenu>

              </Menu>

            </Sider>

            <Route exact path="/" component={Home}/>
            <Route path="/meet" render={ (props) => <MeetReader events={this.state.events} teams={this.state.teams} {...props} />}/>
            <Route exact path="/import" render={ (props) => <ImportMeet onImportMeet={this.onImportMeet} {...props} />}/>
            
          </Layout>
        </Layout>
         
      </div>
    );
  }
}

export default App;
