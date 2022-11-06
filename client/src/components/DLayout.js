import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined,SettingOutlined,UnorderedListOutlined, UserOutlined, HomeOutlined, CopyOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';

import '../styles/Layout.css';

const { Header, Sider, Content } = Layout;
const DLayout = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <h3>REST-2022</h3>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={window.location.pathname}>
                <Menu.Item key='/home' icon=<HomeOutlined /> >
                    <Link to='/home'>Home</Link>
                </Menu.Item>
                <Menu.Item key='/items' icon=<UnorderedListOutlined /> >
                    <Link to='/items'>Items</Link>
                </Menu.Item>
                <Menu.Item key='/bills' icon=<CopyOutlined /> >
                    <Link to='/bills'>Bills</Link>
                </Menu.Item>
                <Menu.Item key='/customers' icon=<UserOutlined/> >
                    <Link to='/customers'>Customers</Link>
                </Menu.Item>
                <Menu.Item key='/settings' icon=<SettingOutlined /> >
                    <Link to='/settings'>Settings</Link>
                </Menu.Item>
                <Menu.Item key='/logout' icon=<LogoutOutlined /> >
                    Logout
                </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 10,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '10px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    );
};
export default DLayout;