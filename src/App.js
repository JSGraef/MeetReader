import React, { Component } from 'react';
import { Layout, Menu, BackTop } from 'antd';
const { Header, Sider } = Layout;

import { Route, Link } from 'react-router-dom';
import Home from './Home';

import MeetReader from './MeetReader/MeetReader';
import ImportMeet from './MeetReader/ImportMeet';
import Sidebar from './Sidebar';

import './App.css';

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
        <Layout style={{ height: '100vh' }}>
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
            <Sider width={200} style={{ background: '#fff', overflow: 'auto' }}>
              <Sidebar teams={this.state.teams} events={this.state.events} />
            </Sider>

            
            <Route exact path="/" component={Home}/>
            <Route path="/meet" render={ (props) => <MeetReader events={this.state.events} teams={this.state.teams} {...props} />}/>
            <Route exact path="/import" render={ (props) => <ImportMeet onImportMeet={this.onImportMeet} {...props} />}/>
            
          </Layout>
        </Layout>
    );
  }
}

export default App;
