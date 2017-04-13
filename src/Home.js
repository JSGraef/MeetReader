import React, { Component } from 'react';
import { Layout, Breadcrumb} from 'antd';
const { Content } = Layout;

class Home extends Component {
  render() {
    return (

        <Layout style={{ padding: '0 24px 24px', height: '100%' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                <p>Welcome to the home dashboard </p>
            </Content>
        </Layout>

    );
  }
}

export default Home;
