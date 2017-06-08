import React, {Component} from 'react';
import { Form, Icon, Input, Button, Alert } from 'antd';
import { auth } from '../../helpers/auth';

const FormItem = Form.Item;

function setErrorMsg(error) {
  return {
    registerError: error
  }
}

class RegisterForm extends Component {

    state = { registerError: null }

    handleSubmit = (e) => {
        e.preventDefault()
        auth(this.email.value, this.pw.value)
            .catch(e => this.setState(setErrorMsg(e)))

        console.log(e);
    }

    render () {
        const { getFieldDecorator } = this.props.form;
        console.log(this.state.registerError)
        return (
            <div>
                {
                    this.state.registerError &&
                    <Alert message={this.state.registerError.message} type="error" showIcon/>
                }

                <h2>Register new user:</h2><br />
                <form onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
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
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Register Now!
                    </Button>
                </form>
            </div>
        )
    }
}

const WrappedRegisterForm = Form.create()(RegisterForm);

export default WrappedRegisterForm;