import { MenuFoldOutlined, MenuUnfoldOutlined, AreaChartOutlined, FileTextOutlined, ShoppingCartOutlined, LogoutOutlined, UnorderedListOutlined, UserOutlined, HomeOutlined, CopyOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import '../styles/Layout.css';

const { Header, Sider, Content } = Layout;
const DLayout = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const { cartItems, loading } = useSelector(state => state.rootReducer);
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);
    const navigate = useNavigate();
    return (
        <Layout>
            {loading && (
                <div className="spinner">
                    <div className="flex justify-center">
                        <Spin size="large" />
                    </div>
                </div>
            )}
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <h3>{collapsed ? 'R2' : 'REST-2022'}</h3>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={window.location.pathname}
                    onClick={({ key }) => {
                        if (key === 'logout') {
                            localStorage.removeItem('rest-user');
                            navigate('/login');
                        } else {
                            navigate(key);
                        }
                    }}
                    items={[
                        { label: 'Home', key: "/home", icon: <HomeOutlined /> },
                        { label: 'Cart', key: "/cart", icon: <ShoppingCartOutlined /> },
                        { label: 'Items', key: "/items", icon: <UnorderedListOutlined /> },
                        { label: 'Orders', key: "/orders", icon: <FileTextOutlined /> },
                        { label: 'Bills', key: "/bills", icon: <CopyOutlined /> },
                        { label: 'Customers', key: "/customer", icon: <UserOutlined /> },
                        { label: 'Statistics', key: "/stats", icon: <AreaChartOutlined /> },
                        { label: 'Settings', key: "/settings", icon: <SettingOutlined /> },
                        { label: 'Logout', key: "logout", icon: <LogoutOutlined /> }
                    ]}
                ></Menu>
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
                    <div className='cart-count flex items-center' onClick={() => navigate('/cart')}>
                        <b><p className='mt-3'>{cartItems.length}</p></b>
                        <ShoppingCartOutlined />
                    </div>

                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '10px',
                        padding: 24,
                        minHeight: '80vh',
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    );
};
export default DLayout;