import React, { Component } from 'react';
import { Button, Steps, Layout, Menu } from 'antd';
import WrappedRegisterForm from './RegisterForm';
const {Content, Header} = Layout;

class Register extends Component {
    constructor() {
        super();

        this.state = {
            currentStep: 0,
            registerError: null
        }

        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
    }

    nextStep() {
        const current = this.state.currentStep + 1;
        this.setState({currentStep: current});
    }

    prevStep() {
        const current = this.state.currentStep - 1;
        this.setState({currentStep: current});
    }

    render() {        
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

                <Content style={{ background: '#fff', padding: 24, margin: '24px'}}>


                <div className="register">

                    <h1>Register</h1>
         
                    <Steps current={this.state.currentStep}>
                        <Steps.Step title="User Information" description="Add a username and password" />
                        <Steps.Step title="Team Details" description="Enter in team details" />
                        <Steps.Step title="Review / Finish" description="Always double-check!" />
                    </Steps>

                    {
                        this.state.currentStep === 0 &&
                        <div>
                            <br/>
                            <WrappedRegisterForm />
                        </div>
                    }
                    {
                        this.state.currentStep === 1 &&
                        <div>
                            <p>Step 2</p>
                            <Button type="primary" onClick={() => this.nextStep()}>Review</Button> <Button onClick={() => this.prevStep()}>Import Different Meet</Button>
                        </div>
                    }
                    {
                        this.state.currentStep === 2 &&
                        <div>
                            <p>Step 3</p>
                            <Button type="primary" onClick={()=>this.addMeetToDB()}>Save Meet!</Button> <Button onClick={() => this.prevStep()}>Fix Meet Info</Button>
                        </div>
                    }

            </div>

            </Content>
        </Layout>
        );
    }
}

export default Register;