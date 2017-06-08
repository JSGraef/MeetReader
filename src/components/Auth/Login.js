import React, {Component} from 'react';
import WrappedLoginForm from './LoginForm';
import { Layout, Menu } from 'antd';
const {Content, Header} = Layout;

//import {Redirect} from 'react-router-dom'

// TODO - redirect doesn't work from non-logged in person. Need to work on that still.
class Login extends Component {
    //state = { redirectToReferrer: false }

    render() {
        // const {from} = this.props.location.state || {from: {pathname: '/'}};

        // if( this.state.redirectToReferrer )
        //     <Redirect to={from} />

        return (
            <Layout>

                <Header >
                    <div className="logo" />
                    <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px'}}
                    >
                    </Menu>
                </Header>

                <Content style={{ background: '#fff', padding: 24, margin: '24px auto'}}>
                    <WrappedLoginForm />
                </Content>
            </Layout>
            )
    
    }
}

export default Login;