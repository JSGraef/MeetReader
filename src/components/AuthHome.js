import React, { Component } from 'react';
import App from './App';
import Login from './Auth/Login';

import { firebaseAuth } from '../config/constants'
import { Route, Redirect } from 'react-router-dom';

let loggedInInUser;

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component user={loggedInInUser} {...props} />
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
        : <Redirect to='/' />}
    />
  )
}

class AuthHome extends Component {
  state = {
    authed: false,
    loading: true
  }

  authenticate() {
      this.setState({authed: true});
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
        if (user) {
            loggedInInUser = user;
            this.setState({
              authed: true,
              loading: false
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

    shouldComponentUpdate(nextProps, nextState) {
      return !nextState.loading;
    }

    render() {
        if(this.state.loading)
          return <div></div>
        return (
            <div>
              <PrivateRoute authed={this.state.authed} path='/' component={App} />
              <PublicRoute authed={this.state.authed} path='/login' component={Login} />
              {/*<PublicRoute authed={this.state.authed} path='/register' component={Register} />*/}
            </div>
        );
  }
}

export default AuthHome;