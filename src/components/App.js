import React, { Component } from 'react';
import { Layout, Menu, BackTop, Button, Row, Dropdown } from 'antd';
const { Header, Sider, Content } = Layout;

import { Route, Link } from 'react-router-dom';
import Home from './Home';

import MeetReader from './MeetReader/MeetReader';
import ImportMeet from './MeetReader/ImportMeet';
import Sidebar from './Sidebar';
import Breadcrumbs from './Breadcrumbs';

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

    const menu = (
      <Menu mode="vertical" >
        <Menu.Item key="username">{this.props.user.email}</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="signout"><Button type="primary" onClick={() => {logout()}} >Sign Out</Button></Menu.Item>
      </Menu>
  );

    return (
        <Layout style={{minHeight: '100vh'}}>
          <BackTop />

          <Header >
            
            <div className="logo" />
            <Row type="flex" justify="space-between">
            
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['home']}
                style={{ lineHeight: '64px'}}
              >
                <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
                <Menu.Item key="meet"><Link to="/meet">Meet</Link></Menu.Item>
                <Menu.Item key="import"><Link to="/import">Import</Link></Menu.Item>
              </Menu>

            <Row type="flex" justify="end">
              <Dropdown.Button type="primary" overlay={menu} trigger={['click']}>
                <Link to="/account">My Account</Link>
              </Dropdown.Button>
            </Row>
            
            </Row>
          </Header>

          <Layout style={{minHeight: '100%'}}>
            <Sider width={250} style={{ background: '#fff' }}>
              <Sidebar teams={this.state.teams} events={this.state.events} />
            </Sider>

            <Layout style={{ padding: '0 24px 24px', height: '100%'}}>

              <Breadcrumbs path={this.props.location.pathname} />

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
