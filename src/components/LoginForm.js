import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox, Layout, Menu } from 'antd';
const FormItem = Form.Item;
const {Content, Header} = Layout;
import { login, resetPassword } from '../helpers/auth';

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

class LoginForm extends Component {
    state = { loginMessage: null }

    resetPassword = () => {
        resetPassword(this.email.value)
            .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
            .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        this.props.form.validateFields((err, values) => {
            if (!err) {
                login(this.email.value, this.pw.value)
                    .catch((error) => {
                        this.setState(setErrorMsg('Invalid username/password.'))
                    })
            }
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;

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

                    {
                        this.state.loginMessage &&
                        <div className="alert alert-danger" role="alert">
                            <span className="sr-only">Error:</span>
                            &nbsp;{this.state.loginMessage} <a href="#" onClick={this.resetPassword} className="alert-link">Forgot Password?</a>
                        </div>
                    }

                    <h2>Sign In</h2><br/>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} ref={(email) => this.email = email.refs.input} placeholder="Email" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} ref={(pw) => this.pw = pw.refs.input} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot" onClick={this.resetPassword}>Forgot password</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </FormItem>
                    </Form>
                </Content>
        </Layout>
        );
    }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;