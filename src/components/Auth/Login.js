import React, {Component} from 'react';
import WrappedLoginForm from './LoginForm';
//import {Redirect} from 'react-router-dom'

// TODO - redirect doesn't work from non-logged in person. Need to work on that still.
class Login extends Component {
    //state = { redirectToReferrer: false }

    render() {
        // const {from} = this.props.location.state || {from: {pathname: '/'}};

        // if( this.state.redirectToReferrer )
        //     <Redirect to={from} />

        return <WrappedLoginForm />
    
    }
}

export default Login;