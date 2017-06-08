import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import { login, resetPassword } from '../../helpers/auth';
import {Link} from 'react-router-dom';
const FormItem = Form.Item;

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            loginMessage: null 
        }
  }

    resetPassword = () => {
        resetPassword(this.email.value)
            .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
            .catch((error) => this.setState(setErrorMsg(`Please provide an email address.`)))
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                login(this.email.value, this.pw.value)
                    .catch((error) => {
                        this.setState(setErrorMsg('Invalid username / password.'))
                    })
            }
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                    {
                        this.state.loginMessage &&
                        <Alert message={this.state.loginMessage} type="warning" showIcon/>
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
                            Or <Link to="/register">register now!</Link>
                        </FormItem>
                    </Form>
                </div>
        );
    }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;