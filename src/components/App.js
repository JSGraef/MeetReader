import React, { Component } from 'react';
import { Layout, Menu, BackTop, Breadcrumb, Button } from 'antd';
const { Header, Sider, Content } = Layout;

import { Route, Link } from 'react-router-dom';
import Home from './Home';

import MeetReader from './MeetReader/MeetReader';
import ImportMeet from './MeetReader/ImportMeet';
import Sidebar from './Sidebar';

import { logout } from '../helpers/auth'

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
        <Layout >
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
              <Menu.Item key="signout"><Button type="primary" onClick={() => {logout()}} >Sign Out</Button></Menu.Item>
            </Menu>
            
          </Header>

          <Layout style={{minHeight: '100vh'}}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Sidebar teams={this.state.teams} events={this.state.events} />
            </Sider>

            <Layout style={{ padding: '0 24px 24px', height: '100%'}}>

              <Breadcrumb style={{ margin: '12px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>{this.state.location}</Breadcrumb.Item>
              </Breadcrumb>

              <Content style={{ background: '#fff', padding: 24, margin: 0}}>
                
                <Route exact path="/" component={Home}/>
                <Route path="/meet" render={ (props) => <MeetReader events={this.state.events} teams={this.state.teams} {...props} />}/>
                <Route exact path="/import" render={ (props) => <ImportMeet onImportMeet={this.onImportMeet} {...props} />}/>
              
              </Content>
            
            </Layout>
          </Layout>
            
  
        </Layout>
    );
  }
}

export default App;
