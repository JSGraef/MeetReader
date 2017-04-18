import React, { Component } from 'react';
import App from './App';
import WrappedLoginForm from './LoginForm';

import { firebaseAuth } from '../config/constants'
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to='/login' />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/' />}
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
        return (
            <div>
              <PrivateRoute authed={this.state.authed} path='/' component={App} />
              <PublicRoute authed={this.state.authed} path='/login' component={WrappedLoginForm} />
              {/*<PublicRoute authed={this.state.authed} path='/register' component={Register} />*/}
            </div>
        );
  }
}

export default AuthHome;