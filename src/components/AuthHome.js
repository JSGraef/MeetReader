import React, { Component } from 'react';
import App from './App';
import WrappedLoginForm from './LoginForm';

import { Layout, Menu } from 'antd';
const { Header } = Layout;

import { logout } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'
import Home from './Home';
import MRDashboard from './MeetReader/MRDashboard';

import { Route, Link, Redirect, Switch } from 'react-router-dom';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/import' />}
    />
  )
}

class AuthHome extends Component {
    state = {
    authed: false,
    loading: true,
  }

  authenticate() {
      this.setState({authed: true});
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({
            authed: true,
            loading: false,
            })
        } else {
            this.setState({
            authed: false,
            loading: false
            })
        }
        })
    }
    
    componentWillUnmount () {
        this.removeListener()
    }
    

    render() {
      console.log(this.state.authed);
        return (
            <div>
                <Switch>
                    <PrivateRoute authed={this.state.authed} path='/' component={App} />
                    <PublicRoute authed={this.state.authed} exact path='/login' component={WrappedLoginForm} />
                    {/*<PublicRoute authed={this.state.authed} path='/register' component={Register} />*/}
                    <Route render={() => <h3>No Match</h3>} />
              </Switch>               
            </div>
        );
  }
}

export default AuthHome;