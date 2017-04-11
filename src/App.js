import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Table } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

import './App.css';

const columns = [
  { title: 'Place', dataIndex: 'place', key: 'place' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Team', dataIndex: 'team', key: 'team' },
  { title: 'Seed Time', dataIndex: 'seedtime', key: 'seedtime' },
  { title: 'Prelim Time', dataIndex: 'prelimtime', key: 'prelimtime' },
  { title: 'Finals Time', dataIndex: 'finalstime', key: 'finalstime' },
  { title: 'Time Adjustment', dataIndex: 'timeadjustment', key: 'timeadjustment' },
  { title: 'Points Scored', dataIndex: 'pointsscored', key: 'pointsscored' },
];

const data = [
  { key: 1, place: 1, name: 'Brown, John', team: 'MRTS', seedtime: '2:20.21', prelimtime: '', finalstime: '2:13.67', timeadjustment: '-6.54', pointsscored: 20, splits: "SPLITS: 30.37 (30.37)  1:04.36 (33.99)  1:39.68 (35.32)  2:13.67 (33.99)"},
  { key: 2, place: 2, name: 'Alkaline, Harry', team: 'MRSSL', seedtime: '2:17.83', prelimtime: '', finalstime: '2:13.80', timeadjustment: '-4.03', pointsscored: 17, splits: "SPLITS: 30.37 (30.37)  1:04.36 (33.99)  1:39.68 (35.32)  2:13.67 (33.99)"},
  { key: 3, place: 3, name: 'Corkran, Samuel', team: 'MRVAC', seedtime: '2:30.00', prelimtime: '', finalstime: '2:25.48', timeadjustment: '-4.52', pointsscored: 16, splits: "SPLITS: 30.37 (30.37)  1:04.36 (33.99)  1:39.68 (35.32)  2:13.67 (33.99)"},
  { key: 4, place: 4, name: 'Garett, Timothy', team: 'MRTS', seedtime: '2:33.57', prelimtime: '', finalstime: '2:30.92', timeadjustment: '-2.65', pointsscored: 15, splits: "SPLITS: 30.37 (30.37)  1:04.36 (33.99)  1:39.68 (35.32)  2:13.67 (33.99)"},
  { key: 5, place: 5, name: 'Vu, Yam', team: 'MRVAC', seedtime: '2:46.48', prelimtime: '', finalstime: '2:35.28', timeadjustment: '-11.20', pointsscored: 14, splits: "SPLITS: 30.37 (30.37)  1:04.36 (33.99)  1:39.68 (35.32)  2:13.67 (33.99)"},
  { key: 6, place: 6, name: 'Greene, Barry', team: 'MRSSL', seedtime: '2:28.25', prelimtime: '', finalstime: '2:37.16', timeadjustment: '+8.91', pointsscored: 13, splits: "SPLITS: 30.37 (30.37)  1:04.36 (33.99)  1:39.68 (35.32)  2:13.67 (33.99)"},
 ];

class App extends Component {
  render() {
    let activeItem = 'add';
    return (
      <div className="app">
        <Layout style={{ height: '100%' }}>
          <Header >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px'}}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>
          <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                  <Menu.Item key="1">option1</Menu.Item>
                  <Menu.Item key="2">option2</Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px', height: '100%' }}>
              <Breadcrumb style={{ margin: '12px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280, height: '100%' }}>
                <Table
                  columns={columns}
                  expandedRowRender={record => <p>{record.splits}</p>}
                  dataSource={data}
                  title={()=><h1>{'#6 BOYS 9-10 200 FREE'}</h1>}
                  pagination={false}
                />

                <Table
                  columns={columns}
                  expandedRowRender={record => <p>{record.splits}</p>}
                  dataSource={data}
                  title={()=><h1>{'#6 BOYS 9-10 200 FREE'}</h1>}
                  pagination={false}
                />

                <Table
                  columns={columns}
                  expandedRowRender={record => <p>{record.splits}</p>}
                  dataSource={data}
                  title={()=><h1>{'#6 BOYS 9-10 200 FREE'}</h1>}
                  pagination={false}
                />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
